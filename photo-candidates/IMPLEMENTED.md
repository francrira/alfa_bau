# Implemented website photographs

The approved shortlist is now integrated into the shared German/English page layouts. Original candidates and review previews are preserved. The production images are exported from the HEIC originals, not the smaller JPEG review copies.

## Placement

| Original selection | Website export | Placement |
| --- | --- | --- |
| Erdbau bagger tiefbau/IMG_8680.HEIC | public/images/work/excavation.webp | Overview, excavation references, excavator personnel, Tiefbau and machine-operator detail pages |
| Erdbau bagger tiefbau/IMG_7464.HEIC | public/images/work/site-team.webp | Company page, team personnel cards, team service pages, overview gallery |
| Erdbau bagger tiefbau/IMG_8440.HEIC | public/images/work/shaft-installation.webp | Overview thumbnail and excavation galleries |
| kanalbau/IMG_7482.HEIC | public/images/work/utility-ducts.webp | Pipework service main photo, utilities reference card, overview gallery |
| kanalbau/IMG_8495.HEIC | public/images/work/trench-pipework.webp | Pipework and excavation galleries |
| kanalbau/IMG_9320.HEIC | public/images/work/drainage-connections.webp | Pipework gallery |
| kanalbau/IMG_9343.HEIC | public/images/work/duct-entry.webp | Pipework gallery |
| pfalaster arbeit/IMG_8246.HEIC | public/images/work/paved-path.webp | Homepage hero, service and work cards, paving, gardening and landscaping detail pages, reference gallery, small projects |
| pfalaster arbeit/IMG_8218.HEIC | public/images/work/paving-detail.webp | Paving gallery and small projects |
| pfalaster arbeit/IMG_9496.HEIC | public/images/work/outdoor-steps.webp | Outdoor reference card, landscaping gallery and small projects |
| pfalaster arbeit/IMG_9685.HEIC | public/images/work/paving-worker.webp | Personnel, careers, paving gallery, work-in-progress reference and decorative CTA background |
| pfalaster arbeit/IMG_7381.HEIC | public/images/work/paving-along-tracks.webp | Paving and landscaping galleries |

IMG_8248 is a complementary view of IMG_8246 and was left out to avoid near duplicates, as recommended in SHORTLIST.md.

## Responsive exports

Each photo has a maximum-width 1280px WebP and a 640px WebP sibling. The originals are not cropped or retouched. Browser crops use the focal positions recorded in lib/photos.ts. Exported files omit original camera metadata. Images below the hero load lazily; the hero is prioritised. Full export dimensions and byte counts are recorded in WEBSITE-EXPORTS.json.

The local export script uses the existing sharp installation and the HEIC converter already used for the review. It is an optional asset preparation tool, not a runtime or build dependency.

## Generated gap-fill images

The selected candidates contain no clear wheel loader or tipper truck image. Two generic illustrations were generated using the built-in image_gen tool and exported into the workspace:

- public/images/generated/wheel-loader.webp
- public/images/generated/wheel-loader-640.webp
- public/images/generated/tipper-truck.webp
- public/images/generated/tipper-truck-640.webp

These images appear only in the wheel-loader and truck personnel cards. Both display a visible “KI-generiertes Symbolbild” / “AI-generated illustration” label. They are not used as company project references, employee portraits or proof of completed work.

### Final wheel-loader prompt

Use case: photorealistic-natural. Create one landscape editorial photograph for a civil engineering website personnel card illustrating wheel loader operators. A realistic yellow wheel loader on a modest Northern European construction site with a gravel stockpile, front three-quarter view, complete machine visible and centered with generous framing for a 16:9 card crop. Authentic slightly dusty steel and rubber, subtle wear, overcast daylight, restrained natural colours, realistic construction setting. No people, no brands, no logos, no readable words, no company identity. This is a generic illustrative scene, not evidence of a particular company's work. No collage, no border, no typography.

### Final truck prompt

Use case: photorealistic-natural. Create one landscape editorial photograph for a civil engineering website personnel card illustrating construction truck drivers. A realistic dark grey European tipper truck parked safely on firm ground at a modest civil engineering site, side-front three-quarter view, full truck with cab and tipper body visible and centered with generous framing for a 16:9 card crop. Authentic slightly dusty material textures, overcast daylight, restrained natural colours matching a real construction photo. No people, no brands, no logos, no readable words, no identifiable company or client. Generic illustrative scene, not evidence of a particular company's work. No collage, no border, no typography.

## Captions and maintenance

Alt text, crop positions and asset URLs are centralised in lib/photos.ts. Page assignments and service galleries are in lib/site.ts. English alt text and captions are maintained in lib/translations/en.json.

Reference captions describe only the visible work. Project names, client names and locations remain unspecified until verified information is supplied.
