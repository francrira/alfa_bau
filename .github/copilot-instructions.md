# Repository instructions

This repository contains a Next.js App Router website with TypeScript. The original exported site is preserved in `legacy/`; it is an archive.

- German route wrappers belong in `app/(de)/`; English routes and layout belong in `app/(en)/`. Shared page layouts belong in `components/pages/`, and document markup in `components/SiteDocument.tsx`.
- Follow the user's ALFA66 mockup: white backgrounds, bold condensed uppercase headings, olive green accents, dark green feature strips, card grids and compact navigation.
- Main navigation: Leistungen, Personal, Einsatzteams, Referenzen, Unternehmen, Karriere. Keep Kontakt reachable through the inquiry button and footer; retain the existing Projekte and Kleinprojekte routes.
- Shared content and contact details belong in `lib/site.ts`. Preserve existing phone, email and address until the user supplies replacements.
- Use `MediaPlaceholder` for photo slots until the user supplies photography; set its `src` prop to a public asset URL when available.
- Do not invent client names, testimonials, company metrics or project claims.
- Global styles belong in `styles/globals.css`. Keep navigation, filters and forms responsive and keyboard accessible.
- Inquiry buttons use `inquiryHref` to carry a topic into the contact form. The form opens a validated email draft; never show false delivery confirmation. Automatic sending and uploads need a real configured backend.
- Static assets belong in `public/` and their URLs omit `public/`.
- This app is configured for static export. Build with `npm run build`; deploy `out/`. Avoid server-only functionality unless deployment changes.
- Validate with `npm run typecheck`, `npm run build` and `npm run test:e2e`. The browser checks use installed Google Chrome.
- Do not edit generated `.next/`, `out/` or archived bundles.

- Maintain German and English together: add English copy in `lib/translations/en.json`, use `useTranslation()` for displayed text and `localizeHref()` for internal URLs. Never translate route slugs, form field names, or project category keys. Keep the language switch available on mobile and preserve inquiry query parameters.
