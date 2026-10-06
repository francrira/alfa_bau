ALFA66 project audit — 6 October 2026

The local site has a working, current frontend foundation. It is ready for further preparation, but I recommend fixing the contact form's JavaScript-free submission behavior and completing publication requirements before launch. Production security remains unverified because the site has not been deployed.

This review covers the current working files, including uncommitted changes, rather than just the GitHub default branch. It includes routes, shared components, styling, content, translations, assets, package versions, contact data flow, build configuration, and browser tests. It does not change application source or implement the recommendations.

**Evidence and limits.**

| Check | Result |
| --- | --- |
| TypeScript, `npm run typecheck` | Passed |
| npm security advisories, `npm audit --json` | Zero reported vulnerabilities, including development dependencies |
| Normal working-directory build | Failed with `EPERM` while removing an existing `.next/static/...` directory |
| Fresh isolated build of the current source | Passed with Next.js 16.3.8 and Turbopack; generated 40 static pages, including not-found output |
| Existing Chrome browser suite against the fresh export | All 25 tests passed in 47.5 seconds |
| Additional local browser checks | Confirmed JavaScript-free form data in URLs, hidden mobile navigation, duplicate hero-image requests, and absent canonical metadata |
| Literal English translation keys used by `t()` | No missing keys found |
| Visual inspection | Desktop and mobile homepage screenshots, plus the mobile personnel page |
| Deployed TLS, headers, caching, redirects, permissions and delivery | Deferred until a public deployment exists |
| Strix | Read-only repository/domain discovery failed because the connection requires reauthentication; no Strix scan ran |

The isolated build lives under the ignored `test-results/local-audit-1791301725/` folder. Application files were copied for verification; the copied configuration's Turbopack root points to the original workspace so it can resolve the shared dependency directory. The successful isolated build points to existing generated-directory access as the immediate cause of the normal build failure. OneDrive synchronization is a plausible contributing factor, supported by the directory's reparse-point attributes and the repository's documented history, but the precise Windows lock/permission source was not established.

Zero npm advisories means no known issues reported by that registry for this dependency tree at review time. It does not establish that the application, development tools, or future hosting environment are vulnerability-free. This review did not scan Git history for secrets, perform a full accessibility certification, test every browser, or obtain production performance measurements.

**Prioritized findings.**

1. **P1 — Contact form submits personal data into the URL when JavaScript is unavailable.**

   Evidence: [ContactForm.tsx](components/ContactForm.tsx) renders a normal form with named inputs and a submit button, but no explicit `action` or `method`. Only its React submit handler prevents native submission. With JavaScript disabled, a synthetic submission navigated to:

   ```text
   /kontakt/?name=Audit+Synthetic+User&email=audit%40example.com&phone=&inquiry=projekt&subject=&message=Synthetic+privacy+check#anfrage
   ```

   This sends the form content as a GET request to the host and puts it in browser history. On a deployed site it could also enter host/CDN access logs and shared URLs. No email draft is prepared in this mode. The requested inquiry category also falls back to `projekt`, because prefilling relies on `useEffect`.

   Recommendation: prevent native GET submission both before hydration and when JavaScript fails. For the current email-draft design, use a submit control enabled only after hydration and provide a visible direct email/telephone fallback without JavaScript. Alternatively, implement a real POST endpoint with server-side validation and an explicit privacy policy. Merely adding `method="post"` to a static page would not create a functioning backend. Add a regression check for the reproduced privacy behavior when implementing the fix.

2. **P1 — Publication information and privacy content are unfinished.**

   Evidence: no Impressum or Datenschutz routes or footer links exist. Contact details are present, but the project does not include the additional representative/register information expected for a German company site. The README already identifies legal pages as outstanding.

   Recommendation: provide verified company publication details and a privacy notice reflecting the final hosting provider, server logs, contact email handling and any later integrations. Link these pages from the footer and keep them reachable in both language flows. German commercial service-provider information duties are described in [DDG § 5](https://www.gesetze-im-internet.de/ddg/__5.html). This is a launch-content gap, not a demonstrated technical exploit or a complete legal compliance assessment.

3. **P1 — The audited development environment runs an unsupported Node.js release.**

   Evidence: `node --version` returned `v21.6.1`. The package engine permits `>=20.9.0`, which also accepts retired releases. [Node's release table](https://nodejs.org/en/about/previous-releases) lists Node 21 and Node 20 as end-of-life; Node 24 and Node 22 are LTS as of this review.

   Recommendation: use Node 24 LTS for development and CI, pin the intended major version in the repository/hosting configuration, and align the package engine and Node types. The browser bundle does not contain this Node runtime; the concern is the build/development environment and any future runtime deployment.

4. **P2 — Mobile primary navigation requires JavaScript.**

   Evidence: [globals.css](styles/globals.css) hides `.navigation` below 900px unless `.is-open` is set. [Header.tsx](components/Header.tsx) sets that class with React state. With JavaScript disabled at 390px, the primary navigation remains hidden and its menu button cannot open it. Footer and content links remain usable, so the whole site is not inaccessible.

   Recommendation: provide progressive navigation, for example a native disclosure menu or a visible default navigation that collapses after hydration. The existing JavaScript-free test checks readable homepage content, not whether the menu or form works.

5. **P2 — The homepage downloads both hero image variants.**

   Evidence: a fresh 1440px Chrome visit recorded `paved-path.webp` initiated by a preload link at 314,908 bytes and `paved-path-640.webp` initiated by an image at 82,914 bytes. [MediaPlaceholder.tsx](components/MediaPlaceholder.tsx) combines a manual responsive `<picture>` source with a priority Next Image. The preload and source-selection mechanisms do not consistently select a single asset during initial loading.

   Recommendation: use one coordinated responsive image strategy and ensure the preload uses the same `imagesrcset` and `imagesizes` as the displayed image. Verify requests at representative widths and device pixel ratios after the change. The audit confirms duplicate requests; it does not quantify production LCP impact.

6. **P2 — Unused archive assets are copied into the public export.**

   Evidence: `public/` contains 101,126,775 bytes across 87 files. Current application/style references do not use `public/projects/`, `public/images/home/`, `public/images/services/`, or the Montserrat fonts. Together those groups account for about 94.3 MB:

   | Asset group | Size, decimal MB |
   | --- | ---: |
   | Original project JPGs | 55.18 |
   | Original homepage PNGs | 14.92 |
   | Original service images | 20.61 |
   | Unused Montserrat font files | 3.60 |
   | Current work-photo WebP variants | 6.14 |
   | Current generated illustrations | 0.32 |

   Recommendation: retain original photography and historical material outside `public/`, and publish only assets used by the current site. Review old originals before retaining public URLs. This reduces deployment size and unnecessary public exposure. The 101 MB total is the published asset inventory, not the bytes downloaded by every visitor.

7. **P2 — Search and social metadata need deployment-specific completion.**

   Evidence: [routes.ts](lib/routes.ts) provides translated titles, descriptions and DE/EN alternate links. There is no canonical URL, metadata base, sitemap, robots file, Open Graph image or organization structured data in the current source. `/projekte/` and `/referenzen/` render the same content, creating a duplicate-route decision to resolve. Absence of a robots file or sitemap does not itself prevent indexing.

   Recommendation: choose the final domain, add absolute canonical/alternate URLs, provide appropriate sitemap/social metadata, and decide whether the duplicate project route should redirect or share a canonical. Implement the old URL redirects documented in README, including `.html` variants, at the host.

8. **P2 — Smaller text on inner pages needs readability work.**

   Evidence: desktop footer address text computes to 10.72px; several older inner-page/footer rules remain approximately 9–12px. The mobile personnel page keeps two dense columns at 390px. The homepage has larger text and softer cards, while inner pages retain more compact layouts.

   Recommendation: raise supporting copy and footer text toward 14–16px, revisit mobile card density, and review keyboard navigation, contrast, zoom and touch targets across inner pages. Small font size alone is not a proven WCAG failure; this is a visual/readability finding. Existing width checks pass at 320, 390, 768, 1024 and 1440px.

9. **P2 — Validation is local; continuous checks are missing.**

   Evidence: `.github/` has repository instructions but no workflow. Package scripts include type checking, building and browser tests, but no linting. Playwright requires installed Google Chrome and currently exercises one browser engine.

   Recommendation: automate dependency installation with `npm ci`, supported Node, type checking, production build and browser checks in CI. Add meaningful lint/accessibility checks and browser coverage according to the target audience. Keep the JavaScript-free privacy/navigation cases in the verification scope.

10. **P3 — Asset-generation scripts are tied to this machine.**

    Evidence: the photo review/export scripts load `heic-convert` from a temporary directory. Generated-image exports reference absolute paths under this user's Codex image directory. `sharp` is used by those scripts but is supplied transitively through Next.js rather than declared as their own dependency.

    Recommendation: make source locations configurable, declare the tools required by maintained scripts, and document how to regenerate assets on a clean checkout. Existing exported assets build successfully, so this affects regeneration and maintainability rather than current page rendering.

**Current libraries and graphics tools.**

| Package/tool | Verified current project state | Assessment |
| --- | --- | --- |
| Next.js | 16.3.8 installed and locked | Matches the latest stable version shown by the official documentation and the September security release |
| React / React DOM | 19.3.0 | npm outdated did not report either as outdated |
| Playwright | 1.63.0 | Current according to npm outdated; existing browser tests pass |
| TypeScript | 5.9.3 | Works with this project; npm reports 7.0.2 as the latest major, so a separate migration assessment is appropriate |
| Node type declarations | 22.20.5 | Align with the selected Node runtime; a newer major alone is not a reason to upgrade blindly |
| Styling and animation | Native CSS, IntersectionObserver and Web Animations API | Appropriate for this brochure site; no animation library dependency is needed for current effects |
| Icons | Inline SVG in `Icon.tsx` | Scalable and locally served; preserve the established icon system |
| Photography | Local 640px/1280px WebP variants | Good foundation; coordinate preload behavior and investigate smaller/larger variants where needed |
| Typography | Local Nunito variable TTF, 276,932 bytes | No external font request; WOFF2/subsetting can be evaluated for transfer savings |

Next.js 16.3.8 includes the fixes recommended in the [September 2026 security release](https://nextjs.org/blog/september-2026-security-release). It is already installed here; the broad `^16.0.0` manifest entry should not be mistaken for the resolved version. Prefer reproducible installation from the committed lockfile.

For future graphics work, [Motion for React](https://motion.dev/docs/react) is a reasonable candidate if the design needs coordinated transitions, springs or richer interactive states. The existing CSS/browser animation approach already covers the current entrance and hover effects, including reduced-motion preferences. [Three.js WebGPURenderer](https://threejs.org/docs/pages/WebGPURenderer.html) supports WebGPU with a WebGL2 fallback and could support a future equipment/site visualization, but there is no current 3D requirement. Introducing it now would add work and browser cost without a demonstrated user benefit. These are capability options, not dependencies installed by this review.

**Page functionality and data.**

The site contains 19 main URLs in each language: ten general pages and nine service-detail pages. English uses `/en/` with the same route slugs. The build adds not-found output. Navigation, topic links, photos, project category filters, language switching, and translated email drafts pass the existing browser checks. Photos load without placeholders, generated personnel illustrations are visibly disclosed in both languages, and reduced-motion behavior is tested.

| Area | Current functionality and data |
| --- | --- |
| Homepage | Staffing-focused hero, four service cards, work examples, three-step process, company introduction and contact form |
| Services | Six main offerings plus three retained service routes, nine static detail pages with photo galleries |
| Personnel and teams | Six role cards and inquiry links; descriptive team process, without live availability data |
| Projects and references | Five photograph-backed work examples and category filtering; both routes show the same dataset |
| Company | Introductory company copy and values; verified contact information comes from `lib/site.ts` |
| Careers | Email inquiry route and descriptive application guidance; no job database or document upload |
| Small projects | Three example areas and a preselected contact topic |
| Contact | Required name/email/message, optional phone/subject, inquiry category, telephone/email links and an outbound map link |
| Content storage | TypeScript objects in `lib/site.ts` and `lib/photos.ts`; English translations in `lib/translations/en.json` |
| Database/backend | No database client, authentication, runtime API endpoint, file-upload service or automated email-delivery service identified in the current app |

With JavaScript working, the contact flow is: visitor enters data → browser validates → code encodes a `mailto:` subject/body → visitor's email app opens → visitor sends the message there. The success text correctly says the draft is prepared; it does not claim delivery. There is no server-side inquiry record, delivery status or persistence. Visitors without a configured email app can use the shown email address, but actual draft compatibility and maximum message length across email clients were not verified.

If dependable lead capture becomes a business requirement, design a real delivery endpoint with server validation, abuse controls, clear delivery states and a retention policy. Add uploads only with a defined business need and suitable restrictions. Supabase is an available tool for a future data-backed workflow, but this project currently has no Supabase integration to audit.

In the sampled browser visit there were no external resource requests, cookies or local-storage keys. The source contains no analytics integration or embedded map; the Google Maps link opens externally with `noopener noreferrer`. Public content is React-rendered without a raw HTML injection sink identified by the targeted source scan, and email subject/body values are encoded. These are favorable observations within the reviewed scope, not guarantees about future integrations or host behavior. The limited working-file secret-pattern scan returned no matches; secret history was not examined.

**Plugin use and the later deployment review.**

Context7 was used to check current Next.js static-export behavior, supported by official web documentation and security announcements. Strix could not access its repository/domain inventory because it requires reauthentication. No repository was uploaded to Strix, no paid scan was started, and no scan result is claimed. Figma would help with a comparison against a supplied design file; no such file was part of this audit. Image generation and Sites publishing were not needed for inspecting the existing local project.

Once a deployment exists, inspect HTTPS and certificate configuration, HTTP security headers, cache rules, old-URL redirects, not-found status codes, absolute metadata, real email-client behavior and performance on mobile connections. For static export, configure redirects and headers at the host: Next.js documents these as unsupported runtime features of export in its [static-export guide](https://nextjs.org/docs/app/guides/static-exports). In particular, validate a CSP against the exported inline scripts, consider framing restrictions, `X-Content-Type-Options`, referrer and permissions policies, and apply HTTPS/HSTS according to the chosen host. Their production presence or absence is currently unknown.

Deploy the generated `out/` directory, as the repository specifies. Keep raw photo candidates, Git metadata, development files and the legacy archive out of the public upload. After deployment and Strix reauthentication, a scan scoped to the published site can supplement these local findings.

Recommended order: fix the form privacy behavior and publication content, standardize on supported Node and repeat the build checks, improve navigation/image loading and asset packaging, complete deployment metadata/configuration, then run the public-site review.
