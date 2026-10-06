import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const config = await readFile(path.join(root, ".htaccess"), "utf8");
const headers = [...config.matchAll(/^Header always set ([\w-]+) "([^"]+)"$/gm)].map(match => [match[1], match[2]]);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".ttf": "font/ttf", ".ico": "image/x-icon", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
http.createServer(async (req, res) => {
  headers.forEach(([name, value]) => res.setHeader(name, value));
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405).end(); return; }
  try {
    let file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    res.setHeader("Content-Type", types[path.extname(file).toLowerCase()] || "application/octet-stream");
    res.end(await readFile(file));
  } catch {
    res.setHeader("Content-Type", types[".html"]);
    res.writeHead(404).end(await readFile(path.join(root, "404.html")));
  }
}).listen(4173, "127.0.0.1");
