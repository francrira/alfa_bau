<?php
// Copy to /etc/alfa66bau/contact-config.php on the server (OUTSIDE the website folder) and fill in.
// Never commit the real file. See deployment/README.md, "Contact form".
return [
    // Google Workspace SMTP. Use an App Password for info@alfa66bau.de, not the normal password.
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 465,
    'smtp_user' => 'info@alfa66bau.de',
    'smtp_password' => 'PASTE-16-CHARACTER-APP-PASSWORD',
    'from' => 'info@alfa66bau.de',
    'from_name' => 'ALFA66 Website',
    // Where enquiries are delivered.
    'to' => 'info@alfa66bau.de',
    // Only these pages may submit the form.
    'allowed_origins' => ['https://alfa66bau.de'],
];
