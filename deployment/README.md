Deployment preparation

Run `npm ci`, `npm run typecheck`, `npm run build` and `npm run test:e2e` with Node 24 LTS. The build creates `out/` and generates `out/.htaccess` from the Apache template. Publish the contents of `out/`, including `.htaccess`, as a complete replacement of the public website files. Keep any checkout and its `.git` directory outside the public document root. Do not upload the repository, `legacy/`, `photo-candidates/`, audit reports or development files.

Preserve the host's certificate-renewal configuration and any required `.well-known` challenge files when replacing a deployment. The configuration deliberately does not deny `.well-known` or force HTTPS at the application level; the existing HTTP-to-HTTPS redirect remains a hosting responsibility.

On Apache 2.4, the generated configuration requires `mod_rewrite`, `mod_headers`, and permission to use its directives through `AllowOverride` or equivalent virtual-host configuration. Per-directory rewriting also requires `FollowSymLinks` or `SymLinksIfOwnerMatch` under the host's directory policy. Confirm these prerequisites with the hosting administrator before installation. This workstation has no Apache executable/container, so the browser policy has been tested here but Apache's configuration parser has not. Run the host's configuration validation and inspect its error log before switching traffic. If `.htaccess` is ignored, none of its protections can be assumed active.

The generated configuration:

- Blocks web requests to `.git` paths and `.env` filenames.
- Disables directory listings and uses the exported 404 page.
- Redirects the former services, company and contact URLs, including `.html` variants.
- Sets MIME types and security headers, including framing restrictions and an apex-hostname HSTS policy.
- Hashes exported inline scripts for CSP, permits same-origin scripts/assets, and blocks native form submissions. Current contact forms use JavaScript to prepare an email draft.
- Allows inline styles because React image focal points and animation styles use them.
- Sets revalidation for HTML/TXT/XML and long caching for the exported JS/CSS filenames.

Always use `npm run build`; running only `next build` skips configuration preparation. Do not publish the template directly: its inline-script hash marker must be replaced from the current export. Rebuild the policy together with every changed HTML export.

After deployment, verify:

```text
/.git/HEAD              403 or 404
/.git/config            403 or 404
/.git/index             403 or 404
/.git/objects/          403 or 404
/images/work/           No directory listing
/services/              301 to /leistungen/
/contact-us.html        301 to /kontakt/
/a-nonexistent-page/    404 with the branded error page
/robots.txt             200
/sitemap.xml            200
```

Inspect the HTTPS response headers and run the current browser suite against the public URL again. The local preview uses the same generated security-header values to check browser compatibility; it does not validate Apache rewrite behavior or prove that the live host honors `.htaccess`.

These tasks remain outside the code changes:

- Block Git access in the live server configuration immediately; the repository fix only becomes protection once deployed and honored by Apache.
- Configure `www` DNS and certificate coverage before redirecting that hostname to the apex domain.
- Establish and validate DMARC with the mail administrator; verify legitimate senders before enforcement.
- Verify Debian/Apache security updates, enabled modules and certificate auto-renewal.
- Supply the company's verified representative/register details and actual hosting/privacy information for Impressum and Datenschutz pages. These facts must not be invented.

Original imagery remains in the archive. The public asset inventory is approximately 6.8 MB after unused images/fonts were moved out of `public/`, compared with approximately 101 MB before this change.
