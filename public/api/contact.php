<?php
// ALFA66 contact form endpoint.
// Receives the website enquiry as JSON and emails it to the company mailbox over authenticated SMTP.
//
// Security model:
// - Mail is only ever sent TO the configured company address, never to the visitor, so the form
//   cannot be abused to send spam to third parties.
// - The visitor address is only used as Reply-To after strict validation; CR/LF are rejected so no
//   extra mail headers can be injected.
// - Only same-origin JSON POSTs are accepted; a honeypot field, a minimum fill time and per-IP plus
//   daily rate limits stop bots and floods.
// - SMTP credentials live in a config file OUTSIDE the web root (see deployment/README.md).
// - Message contents are never written to logs or disk.

declare(strict_types=1);

const CONFIG_FILE = '/etc/alfa66bau/contact-config.php';
const LIMITS = ['name' => 100, 'email' => 180, 'phone' => 50, 'inquiry' => 80, 'subject' => 180, 'message' => 4000];
const PER_IP_PER_HOUR = 5;
const TOTAL_PER_DAY = 60;
const MIN_FILL_MS = 3000;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

if (!is_readable(CONFIG_FILE)) respond(503, ['ok' => false, 'error' => 'not_configured']);
$config = require CONFIG_FILE;
foreach (['smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'to', 'allowed_origins'] as $key) {
    if (empty($config[$key])) respond(503, ['ok' => false, 'error' => 'not_configured']);
}

// Same-origin only. Browsers always send Origin on cross-site and on JSON POSTs.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!in_array($origin, $config['allowed_origins'], true)) respond(403, ['ok' => false, 'error' => 'origin']);
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) respond(415, ['ok' => false, 'error' => 'type']);

$raw = file_get_contents('php://input', false, null, 0, 20000);
$input = json_decode($raw === false ? '' : $raw, true);
if (!is_array($input)) respond(400, ['ok' => false, 'error' => 'invalid']);

// Bots fill the hidden field or submit instantly. Pretend success so they learn nothing.
if (!empty($input['website']) || (int)($input['elapsed'] ?? 0) < MIN_FILL_MS) respond(200, ['ok' => true]);

$fields = [];
foreach (LIMITS as $name => $max) {
    $value = $input[$name] ?? '';
    if (!is_string($value) || !preg_match('//u', $value)) respond(400, ['ok' => false, 'error' => 'invalid']);
    $value = trim(str_replace("\r\n", "\n", $value));
    // Count characters, not bytes, without needing the mbstring extension.
    if (preg_match_all('/./us', $value) > $max) respond(400, ['ok' => false, 'error' => 'invalid']);
    // Only the message may contain line breaks; any other control character is rejected.
    $pattern = $name === 'message' ? '/[\x00-\x08\x0B-\x1F\x7F]/' : '/[\x00-\x1F\x7F]/';
    if (preg_match($pattern, $value)) respond(400, ['ok' => false, 'error' => 'invalid']);
    $fields[$name] = $value;
}
if ($fields['name'] === '' || $fields['message'] === '' || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    respond(400, ['ok' => false, 'error' => 'invalid']);
}

// Rate limiting with small lock-protected counters. Only hashed IPs and timestamps are stored.
function within_limit(string $key, int $max, int $window): bool {
    $dir = sys_get_temp_dir() . '/alfa66-contact';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $handle = fopen($dir . '/' . hash('sha256', $key), 'c+');
    if ($handle === false) return true; // Never block real visitors because of a disk issue.
    flock($handle, LOCK_EX);
    $now = time();
    $stamps = array_filter(json_decode(stream_get_contents($handle) ?: '[]', true) ?: [], fn($t) => is_int($t) && $t > $now - $window);
    $allowed = count($stamps) < $max;
    if ($allowed) $stamps[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode(array_values($stamps)));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $allowed;
}
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!within_limit('ip:' . $ip, PER_IP_PER_HOUR, 3600) || !within_limit('all', TOTAL_PER_DAY, 86400)) {
    respond(429, ['ok' => false, 'error' => 'rate_limited']);
}

function header_text(string $text): string { return '=?UTF-8?B?' . base64_encode($text) . '?='; }

$subjectLine = 'Website-Anfrage: ' . ($fields['subject'] !== '' ? $fields['subject'] : $fields['inquiry']);
$body = "Neue Anfrage über alfa66bau.de\n\n"
    . 'Anfrage: ' . $fields['inquiry'] . "\n"
    . 'Name: ' . $fields['name'] . "\n"
    . 'E-Mail: ' . $fields['email'] . "\n"
    . 'Telefon: ' . ($fields['phone'] !== '' ? $fields['phone'] : '-') . "\n"
    . 'Betreff: ' . ($fields['subject'] !== '' ? $fields['subject'] : '-') . "\n"
    . 'Sprache: ' . (($input['language'] ?? '') === 'en' ? 'Englisch' : 'Deutsch') . "\n\n"
    . "Nachricht:\n" . $fields['message'] . "\n\n"
    . "-- \nAntworten Sie direkt auf diese E-Mail, um dem Absender zu antworten.\n";

$from = $config['from'] ?? $config['smtp_user'];
$domain = substr(strrchr($from, '@') ?: '@alfa66bau.de', 1);
$message = implode("\r\n", [
    'Date: ' . date(DATE_RFC2822),
    'From: ' . header_text($config['from_name'] ?? 'ALFA66 Website') . ' <' . $from . '>',
    'To: <' . $config['to'] . '>',
    'Reply-To: ' . header_text($fields['name']) . ' <' . $fields['email'] . '>',
    'Subject: ' . header_text($subjectLine),
    'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $domain . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    rtrim(chunk_split(base64_encode($body), 76, "\r\n")),
]);

// Minimal SMTP client (implicit TLS on 465, or STARTTLS on 587). Certificates are verified.
function smtp_send(array $config, string $from, string $to, string $message): bool {
    $port = (int)$config['smtp_port'];
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $config['smtp_host']]]);
    $target = ($port === 465 ? 'ssl://' : 'tcp://') . $config['smtp_host'] . ':' . $port;
    $socket = @stream_socket_client($target, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if ($socket === false) return false;
    stream_set_timeout($socket, 15);
    $read = function () use ($socket): int {
        $line = '';
        while (($chunk = fgets($socket, 1024)) !== false) {
            $line = $chunk;
            if (strlen($chunk) < 4 || $chunk[3] !== '-') break;
        }
        return (int)substr($line, 0, 3);
    };
    $send = function (string $command, array $expect) use ($socket, $read): bool {
        fwrite($socket, $command . "\r\n");
        return in_array($read(), $expect, true);
    };
    $ok = $read() === 220 && $send('EHLO alfa66bau.de', [250]);
    if ($ok && $port !== 465) {
        $ok = $send('STARTTLS', [220]) && stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT) && $send('EHLO alfa66bau.de', [250]);
    }
    $ok = $ok
        && $send('AUTH LOGIN', [334])
        && $send(base64_encode($config['smtp_user']), [334])
        && $send(base64_encode($config['smtp_password']), [235])
        && $send('MAIL FROM:<' . $from . '>', [250])
        && $send('RCPT TO:<' . $to . '>', [250, 251])
        && $send('DATA', [354])
        // Base64 body lines never start with ".", so no dot-stuffing is needed.
        && $send($message . "\r\n.", [250]);
    @fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return $ok;
}

if (!smtp_send($config, $from, $config['to'], $message)) {
    error_log('alfa66 contact: SMTP delivery failed'); // No personal data in the log.
    respond(502, ['ok' => false, 'error' => 'delivery']);
}
respond(200, ['ok' => true]);
