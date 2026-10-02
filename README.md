# ALFA66 website

Next.js App Router and TypeScript website, designed around the supplied ALFA66 mockup.

## Development

Use a supported Node.js LTS release (Node.js 22 or newer is recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000. Check types with `npm run typecheck` and build with `npm run build`. The build produces the static website in `out/`; deploy that folder.

If OneDrive marks generated files read-only and a rebuild fails with EPERM, stop any running development server and remove only the generated `.next/` and `out/` folders before rebuilding. Keeping the working checkout outside OneDrive also avoids its file-locking behavior.

## Pages and structure

- `app/(de)/`: German route wrappers and German document layout at the original URLs.
- `app/(en)/`: English document layout and static English pages under `/en/`, covering every German route.
- `components/pages/`: shared page layouts used by both languages.
- `components/`: navigation, branding, icons, service cards, personnel cards, team process, project filters, contact form, photo placeholders and footer.
- `lib/site.ts`: contact details, navigation, service content, personnel roles, project categories and inquiry URL helper.
- `styles/globals.css`: responsive styles matching the mockup's white, olive green and dark green design.
- `public/`: preserved images, project photos, logo, fonts and reserved team folder.
- `legacy/`: original exported website, preserved as an archive and excluded from the new build.

## Photos and verified content

All photo slots currently use `components/MediaPlaceholder.tsx`. To use a photo later, add it under `public/` and pass its URL through the `src` prop:

```tsx
<MediaPlaceholder label="Unser Team" src="/team/team.jpg" className="company-media" />
```

The original photos remain available under `public/`. The new layout does not require them.

Project cards currently describe categories and are explicitly placeholders. Replace them with verified projects, descriptions and photographs in `lib/site.ts`. Client names, testimonials and company statistics from the mockup have not been invented. Existing phone, email and address are retained.

## Working interactions

- Responsive navigation with active-page state and mobile menu supporting Escape.
- Service cards link to detail pages.
- Service, personnel and career inquiry buttons preselect the matching topic in the contact form.
- Reference cards filter by project category.
- Contact form validates required fields and prepares an email draft in the visitor's email application. The visitor sends it there; attachments can be added there. There is no automatic sending service or upload backend.
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

Configure permanent redirects at your static host before deployment, including the old `.html` variants:

- `/services` to `/leistungen`
- `/services/gardening` to `/leistungen/gartenbau`
- `/services/tief-bau` to `/leistungen/tiefbau`
- `/services/landscaping` to `/leistungen/landschaftsbau`
- `/about-us` to `/unternehmen`
- `/contact-us` to `/kontakt`

Serve `legacy/` as a static directory if you need to preview the original export.

## German and English

Use the DE / EN switch in the header, including on mobile. German stays at the existing URLs; English is available under `/en/` (for example `/en/leistungen/`). Every internal link retains the selected language. Switching languages keeps the current page, query parameters and anchor, including the selected inquiry topic.

Both languages are exported as static HTML with the correct document language, translated metadata and alternate-language links. English content is available before JavaScript runs. No external translation widget or service is required.

German content remains in the shared components and `lib/site.ts`. English translations are maintained in `lib/translations/en.json`; add the matching English translation whenever new German copy is introduced. The translation helper and locale URL helpers live in `lib/i18n.ts`.

The browser suite covers both languages, including static English rendering, language switching, translated email drafts, filters and responsive layouts.