ALFA66 live-site review — 6 October 2026

The redesigned website at https://alfa66bau.de works in the tested Chrome flows, but the deployment has confirmed security and routing issues. The highest priority is blocking access to the publicly readable Git repository metadata. The previous website is also still publicly served at several old URLs.

Application source and live hosting settings were not changed in this review. Only local test artifacts and this report were created. Server remediation needs the actual hosting configuration or administrator access.

**Verified results.**

| Check | Result |
| --- | --- |
| Existing browser suite against the public site | 25 passed, 0 failed, 0 skipped, 0 flaky; approximately 78 seconds |
| Current page routes | 19 German and 19 English routes load successfully |
| Current internal navigation | Links checked by the suite resolve successfully |
| Language switching | Page, inquiry topic and anchor preserved; English content exists before JavaScript runs |
| Service inquiries | Topic prefilling and required-field validation pass |
| Current contact form | Encoded email draft addressed to `info@alfa66bau.de`; no delivery confirmation falsely claimed |
| Project filters | German and English category filtering passes |
| Mobile menu | Opens, closes, supports Escape and restores button focus with JavaScript working |
| Layout widths | Checked at 320, 390, 768, 1024 and 1440px |
| Photos | Current-page photos load; generated personnel illustrations are disclosed |
| Motion | Reduced-motion and readable static English content pass |
| HTTPS | Certificate validation succeeds; observed connection uses TLS 1.3 |
| HTTP | Root responds with a permanent redirect to HTTPS |
| Missing routes | Return HTTP 404, although the branded error page is not used |
| Email DNS | Google MX, SPF and Google-selector DKIM records exist |
| Actual email/telephone delivery | Not tested; no message was sent and no telephone call was placed |

Direct HTTP requests and browser rendering confirmed the redesigned site is deployed. A web-reader result initially returned older indexed content; that cached result was not used to judge current functionality.

**P1 — Public Git metadata: confirmed high-priority exposure.**

The following URLs returned HTTP 200:

| Path | Evidence |
| --- | --- |
| `/.git/HEAD` | Recognized Git HEAD content: `ref: refs/heads/main` |
| `/.git/config` | Recognized Git configuration with core and remote sections |
| `/.git/index` | Recognized binary Git index, beginning with `DIRC` |
| `/.git/objects/` | Apache directory listing |

This is actual Git data, not an HTML fallback masquerading as a successful response. Exposing the index and object inventory can help an attacker reconstruct repository content or history. This review did not reconstruct the repository, download object history, or establish that credentials were present. The small configuration sample did not match the tested embedded HTTP-password pattern; that does not establish that the repository is free of secrets.

Action: deny web access to `.git` immediately and publish only the static export into a clean document root. Keep deployment checkouts and their Git metadata outside the served directory. Examine access logs and review the affected repository history for sensitive material; rotate any credentials actually found to have been exposed.

For an Apache virtual host, a directory restriction can deny access to `.git`; the exact configuration must fit the host's document root. Apache documents [DirectoryMatch](https://httpd.apache.org/docs/2.4/mod/core.html#directorymatch) and directory [Options](https://httpd.apache.org/docs/2.4/mod/core.html#options). After applying the restriction, GET requests to all four paths above must return 403 or 404, while the current site continues to pass its tests.

**P1 — The form still has an unsafe JavaScript-free fallback.**

At `/kontakt/?anfrage=pflasterkolonnen#anfrage`, disabling JavaScript leaves the topic at `projekt`. The enabled submit button attempts a native GET containing name, email and message:

```text
/kontakt/?name=Audit+Synthetic+User&email=audit%40example.com&phone=&inquiry=projekt&subject=&message=Synthetic+privacy+test
```

The request was intercepted before reaching the host. The submitted values were synthetic. For real visitors, this behavior would expose form data in the URL, browser history and potentially hosting logs instead of preparing an email.

Action: prevent native GET submission before hydration and when JavaScript is unavailable. For the existing mailto design, enable submission only after its handler is ready and provide a direct email/telephone fallback. A proper server POST endpoint is another option if dependable lead capture is required. Recheck the reproduced behavior after deployment of the fix.

**P1 — Legal and privacy routes remain absent.**

`/impressum/` and `/datenschutz/` return 404, and the current footer has no corresponding links. Add verified company publication information and privacy text reflecting the deployed host, access logs, contact handling and any later services. The prior local audit explains the outstanding content and points to [DDG § 5](https://www.gesetze-im-internet.de/ddg/__5.html). This review does not certify legal compliance.

**P2 — Directory listings are enabled.**

The following directories returned Apache file-listing pages:

```text
/images/work/
/fonts/
/_next/static/
/services/
/.git/objects/
```

Action: disable directory indexes for the public document root. Listing public assets alone does not establish a secret leak, but the Git listing is part of the confirmed repository exposure. Directory listings also make the old `/services/` URL look like a server file browser rather than a business page.

**P2 — Old URLs expose the previous site or fail to redirect.**

| Old URL | Observed behavior | Intended destination |
| --- | --- | --- |
| `/services` | 301 to `/services/`, then directory listing | `/leistungen/` |
| `/services.html` | 200, previous website | `/leistungen/` |
| `/services/gardening` | 404 | `/leistungen/gartenbau/` |
| `/services/gardening.html` | 200, previous website | `/leistungen/gartenbau/` |
| `/services/tief-bau` | 404 | `/leistungen/tiefbau/` |
| `/services/landscaping` | 404 | `/leistungen/landschaftsbau/` |
| `/about-us` | 404 | `/unternehmen/` |
| `/about-us.html` | 200, previous website with “Comming Soon” heading | `/unternehmen/` |
| `/contact-us` | 404 | `/kontakt/` |
| `/contact-us.html` | 200, previous contact/upload form | `/kontakt/` |

Action: add permanent redirects for both extensionless and `.html` variants, then remove archived web pages from the served deployment. Preserve any archive outside the public document root.

The previous contact page's live JavaScript handler attempts a POST to `http://alfa66bau.de.r.appspot.com`. This was verified by intercepting its fetch call with synthetic input; no POST reached that endpoint. The HTTP target is incompatible with a secure HTTPS form flow because browsers block mixed-content fetch requests. [MDN mixed-content documentation](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content). Redirecting the old page to the current contact page removes this broken entry point. The old endpoint itself was not tested.

**P2 — Security headers are absent on sampled responses.**

The homepage and contact responses do not include:

```text
Strict-Transport-Security
Content-Security-Policy
X-Frame-Options
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

Action: configure suitable headers at Apache/the hosting edge and retest them. Configure a CSP that works with the static export's inline scripts; blindly applying `script-src 'self'` would interfere with the exported page. A framing restriction, `nosniff` and a deliberate referrer policy are useful additions. Introduce HSTS after validating HTTPS and renewal for the intended hostnames; do not automatically include all subdomains without checking them.

JavaScript and CSS are served with their expected MIME types; the font is `font/ttf`. The sampled WebP response lacks a Content-Type header. Set `image/webp` for WebP files.

**P2 — The server banner is behind the latest upstream security release.**

Responses advertise `Apache/2.4.67 (Debian)`. Apache's [security advisory list](https://httpd.apache.org/security/vulnerabilities_24.html) records security fixes released in 2.4.69 on 1 October 2026, including issues involving HTTP/2 and WebDAV. Some advisories depend on specific modules/configurations.

Action: verify the installed Debian package revision, enabled modules and security patch status, then update as appropriate. Debian backports can differ from the advertised upstream version. A response banner alone does not prove these CVEs are exploitable here, and this review did not try to exploit them. The confirmed Git exposure is a configuration issue regardless of the Apache patch level.

**P2 — `www` does not resolve.**

`www.alfa66bau.de` failed resolution through the local resolver and returned NXDOMAIN through Google's public DNS resolver. The observed certificate includes only `alfa66bau.de`.

Action: if visitors should be able to use `www`, add its DNS record, include it in certificate coverage and redirect it to the chosen canonical hostname. The non-www HTTPS site is working.

**P2 — Email domain lacks DMARC.**

Observed DNS:

| Record | Result |
| --- | --- |
| MX | Google mail servers |
| SPF | `v=spf1 include:_spf.google.com ~all` |
| DKIM | RSA public key at `google._domainkey.alfa66bau.de` |
| DMARC | `_dmarc.alfa66bau.de` returned NXDOMAIN through local and Google public resolvers |

Action: establish a DMARC policy and validate legitimate senders before moving to enforcement. A monitoring policy is useful for rollout but does not itself reject spoofed mail. Verify actual outgoing messages are signed/aligned. DNS records do not prove the `info@` mailbox exists, receives messages, or is monitored.

The current site's telephone links are correctly formatted as `tel:+4916096341086`; email links use `mailto:info@alfa66bau.de`. The map link contains the company address and has `noopener noreferrer`. The current form encodes angle brackets and ampersands into the email body; the synthetic script-like text did not become a script element. This is a targeted encoding check, not a complete XSS certification.

**P2 — Missing routes use Apache's error page.**

Both a nonexistent German path and a nonexistent English path correctly return HTTP 404, but neither uses the exported branded error page. `/404.html` is present and contains the new site's not-found content.

Action: configure Apache to use the local exported error page while preserving the 404 status, for example through the appropriate ErrorDocument directive. Recheck nonexistent paths in both language flows afterward.

**P2 — Search metadata and performance improvements remain.**

`/robots.txt` and `/sitemap.xml` return 404; the homepage has no canonical link. Add metadata using the final public domain, a sitemap, suitable crawler guidance and social previews. Missing sitemap/robots files alone do not stop indexing. Resolve the duplicate `/projekte/` and `/referenzen/` content with a canonical/redirect decision.

A sampled desktop visit observed:

| Measurement | Observed sample |
| --- | ---: |
| Resource requests at snapshot | 38 |
| Transferred resource bytes | Approximately 1.22 MB |
| Largest contentful paint | Approximately 1.34 seconds |
| Cumulative layout shift | Approximately 0.029 |

These are one automated desktop session's laboratory observations, without a throttled mobile profile. They are not field Core Web Vitals or a performance guarantee. No external resource requests were present in the sampled redesigned homepage visit.

The browser again downloaded both hero variants: the 314,908-byte large image via preload and the 82,914-byte small image via `<picture>`. Coordinate the image source and preload selection. The previously identified unused public assets remain a deployment-package concern; this review did not download all archived images to recalculate their live total.

The sampled responses include ETag/Last-Modified and gzip for HTML/JS/CSS, but no explicit Cache-Control policy. Add a deliberate policy: long immutable caching for fingerprinted JS/CSS, and revalidation or a suitable shorter policy for HTML and mutable image URLs.

The mobile menu remains hidden with JavaScript disabled; add a progressive fallback. Existing responsive checks pass with JavaScript working. The smaller footer/inner-page text noted in the local audit remains a readability improvement.

**Test artifacts and scope.**

The live suite reused the project's existing tests with its local server disabled and base URL changed to the public site. The one hardcoded localhost English-content check was changed in the temporary copy. Application files were untouched.

Artifacts are in the ignored `test-results/live-audit-2026-10-06/` directory:

- `results.json`: full Playwright results, 25 expected successes and no unexpected failures.
- `inspection.json`: direct HTTP checks, certificate/DNS observations, browser requests, and intercepted current-form submission.
- `confirmed-exposure.json`: Git signatures, directory listings and old-page checks.
- `legacy-and-dns.json`: independent DNS confirmation, intercepted old form handler and asset MIME observations.
- Desktop/mobile screenshots and the temporary live-test configuration/scripts.

Some recorded request cancellations occurred during navigation, speculative Next.js prefetches and the headless mailto handoff. They were not counted as broken pages; the dedicated page/link/photo checks passed. No runtime JavaScript errors were observed on the checked current routes. Strix repeatedly returned an authentication-retry response and did not provide a domain inventory or run a scan, so no Strix pentest result is claimed.

This was a bounded functional and security review, not exhaustive exploitation or an uptime guarantee. It did not send mail, call phone numbers, reconstruct Git history, stress-test the server, test the old external mail endpoint, or inspect administrator/OS settings.

Recommended order: block public Git access and directory indexes; prevent the current form's native GET submission; redirect old routes/remove the old public site; complete publication pages; apply hosting headers and verify patch status; configure `www`, DMARC and metadata; rerun these tests after deployment changes.

**Repository follow-up — fixes prepared on 6 October 2026.**

Following approval to implement repository fixes, the contact form now disables its controls until hydration, provides direct email/phone fallback links, and uses POST rather than a native GET fallback. Mobile navigation is usable without JavaScript. Responsive image handling no longer issues the unused large hero preload at phone/smaller-desktop widths. Canonical URLs, robots.txt and a 36-URL canonical sitemap are generated for the public domain. Unused originals were moved into `legacy/public-assets/`; all 53 archived files are byte-identical to their original Git blobs, and the public asset inventory is now about 6.8 MB.

The build now prepares an Apache `.htaccess` with Git/.env denial rules, disabled indexes, former-URL redirects, branded 404 handling, MIME/cache headers, and CSP hashes generated from the actual exported inline scripts. Instructions and host prerequisites are in [deployment/README.md](deployment/README.md). `.nvmrc` selects Node 24; package engines also permit maintained Node 22.

Verification used a fresh copy of the current source to avoid existing OneDrive-generated-folder locks. The production build and TypeScript checks passed with a checksum-verified official Node 24.21.0 runtime, and all 34 browser tests passed in 48.3 seconds with the generated policy applied. An independent code review found no issues. A policy fixture confirmed that approved inline and same-origin scripts run while an unapproved inline script is blocked.

Clarification of the earlier image observation: at 1440px, two variants can be legitimate because the hero and a service card use different widths. The regression now checks 390px and 1024px, where both placements select the small variant. The old export downloads an unused large variant there; the updated export downloads only the required variant.

These are local source/configuration changes. They have not been deployed, and the live Git exposure remains unresolved until server protection is applied and rechecked. Apache parsing/rewrites cannot be certified on this Windows workstation; `.htaccess` must be honored by the actual host. DNS/DMARC, server patching and verified legal/privacy content remain outstanding.
