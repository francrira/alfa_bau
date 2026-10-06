# ALFA66 website

Next.js App Router and TypeScript website with a light, olive-green design and locally served Nunito typography.

## Development

Use Node.js 24 LTS, selected by `.nvmrc`. Maintained Node.js 22 is also supported. Node.js 20 and 21 are no longer supported.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Check types with `npm run typecheck` and build with `npm run build`. The build produces the static website in `out/` and prepares its Apache `.htaccess`; deploy that folder, including hidden files. See [deployment instructions](deployment/README.md) before publishing.

If OneDrive marks generated files read-only and a rebuild fails with EPERM, stop any running development server and remove only the generated `.next/` and `out/` folders before rebuilding. Keeping the working checkout outside OneDrive also avoids its file-locking behavior.

## Pages and structure

- `app/(de)/`: German route wrappers and German document layout at the original URLs.
- `app/(en)/`: English document layout and static English pages under `/en/`, covering every German route.
- `components/pages/`: shared page layouts used by both languages.
- `components/`: navigation, branding, icons, service cards, personnel cards, team process, project filters, contact form, photo placeholders and footer.
- `components/HomeServices.tsx`, `HomeWork.tsx`, `HomeProcess.tsx`: homepage service overview, real work photographs and three-step staffing inquiry process.
- `components/HomeScrollReveal.tsx`: staggered, one-time entrances when homepage sections scroll into view. Keyboard focus reveals content immediately, and changing reduced-motion preferences cancels active animations.
- `lib/site.ts`: contact details, navigation, service content, image assignments, galleries, personnel roles, project categories and inquiry URL helper.
- `lib/photos.ts`: photograph metadata, responsive assets, alt text and crop positions.
- `styles/globals.css`: responsive styles, rounded typography, homepage entrance animations and hover effects. Motion respects reduced-motion preferences and content remains readable without JavaScript.
- `public/`: preserved images, project photos, logo, fonts and reserved team folder.
- `legacy/`: original exported website, preserved as an archive and excluded from the new build. Unused original public images and Montserrat fonts are retained under `legacy/public-assets/` so they are no longer published.

## Photos and verified content

Twelve approved photos from `photo-candidates/SHORTLIST.md` are installed across the homepage, personnel, projects, company, careers, small-project and service pages. Service detail pages include photo galleries. Production files in `public/images/work/` are exported from the HEIC originals with 1280px and 640px WebP variants; the originals are preserved.

The redesigned homepage uses real construction photographs throughout, with IMG_8246's curved paved path in the split hero. Nunito's variable font and its SIL Open Font License are stored in `public/fonts/Nunito-Variable.ttf` and `public/fonts/Nunito-OFL.txt`; visitors do not request fonts from an external service.

Two generic machinery illustrations fill the missing wheel-loader and truck personnel photos. They live in `public/images/generated/` and are visibly labelled as AI-generated in German and English. Project references use real photos only.

Asset URLs, translated alt-text keys and crop positions live in `lib/photos.ts`. Assignments and service galleries live in `lib/site.ts`. For example:

```tsx
<MediaPlaceholder label="Unser Team" photo={photos.siteTeam} className="company-media" />
```

Image placements, original filenames, generated-image prompts and export details are documented in [photo-candidates/IMPLEMENTED.md](photo-candidates/IMPLEMENTED.md). Reference captions describe visible work; client names, locations and company statistics should be added only when verified. Existing contact details are retained.

## Working interactions

- Responsive navigation with active-page state and mobile menu supporting Escape.
- Service cards link to detail pages.
- Service, personnel and career inquiry buttons preselect the matching topic in the contact form.
- Reference cards filter by project category.
- Contact form validates required fields and prepares an email draft in the visitor's email application. The visitor sends it there; attachments can be added there. There is no automatic sending service or upload backend.
- Form controls stay disabled until the submit handler is ready. Without JavaScript, a direct email/telephone fallback remains available and form data cannot enter the URL.
- Mobile navigation stays visible without JavaScript and collapses into its interactive menu when JavaScript is ready.
- Telephone, email and map links work without an embedded third-party map.
- Keyboard focus styles, skip link and reduced-motion support.

Before deployment, supply the final company content and legal pages. No empty legal links or fictional company facts have been added.

## Browser checks

```sh
npm run build
npm run test:e2e
```

Playwright uses an installed Google Chrome browser and a local server for `out/`. The tests cover all page routes and internal links, mobile navigation, category filters, inquiry prefilling, required-field validation and email draft content. Responsive checks run at 320, 390, 768, 1024 and 1440 pixels. Screenshots are saved under the ignored `test-results/` directory. No email is sent by these checks.

## Old website URLs

The generated Apache `.htaccess` contains permanent redirects for these old URLs and their `.html` variants. Other static hosts require equivalent host-level rules:

- `/services` to `/leistungen`
- `/services/gardening` to `/leistungen/gartenbau`
- `/services/tief-bau` to `/leistungen/tiefbau`
- `/services/landscaping` to `/leistungen/landschaftsbau`
- `/about-us` to `/unternehmen`
- `/contact-us` to `/kontakt`

Serve `legacy/` as a static directory if you need to preview the original export.

## German and English

Use the DE / EN switch in the header, including on mobile. German stays at the existing URLs; English is available under `/en/` (for example `/en/leistungen/`). Every internal link retains the selected language. Switching languages keeps the current page, query parameters and anchor, including the selected inquiry topic.

Both languages are exported as static HTML with the correct document language, translated metadata, absolute canonical URLs and alternate-language links. `/projekte/` uses `/referenzen/` as its canonical route in each language. `robots.txt` and `sitemap.xml` are generated for `https://alfa66bau.de`. English content is available before JavaScript runs. No external translation widget or service is required.

German content remains in the shared components and `lib/site.ts`. English translations are maintained in `lib/translations/en.json`; add the matching English translation whenever new German copy is introduced. The translation helper and locale URL helpers live in `lib/i18n.ts`.

The browser suite covers both languages, including static English rendering, language switching, translated email drafts, filters and responsive layouts.
