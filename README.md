# Hakies Junior School website

A responsive Next.js 16 App Router website for Hakies Junior School, using the school’s photographs and official crest artwork.

## Run locally

- Install dependencies with `npm install`.
- Copy `.env.example` to `.env.local` and fill in the server credentials when configuring enquiries.
- Start the development server with `npm run dev`.
- Run checks with `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.

The app requires Node.js 20.9 or newer; `.nvmrc` selects Node 22. Keep Resend, Next and ESLint versions compatible with the supported runtime when updating dependencies.

## School content

Edit confirmed school information in `src/data/school.ts`. Contact details, location, term dates, fees, illustrative counters, optional page visibility and the review date are held there so each value is maintained once. Leave unknown values as `null`; the configured placeholder is shown in its place. Do not replace placeholders with guessed details.

The optional Staff, Facilities, Downloads, Testimonials and Careers pages are hidden from the navigation until the matching `school.pages` flag is set to `true`. Testimonials require explicit parent or guardian consent. Add approved PDF files to `public/downloads/`; the Downloads page lists them at build time.

### Gallery photos

Put approved photos in `public/gallery/` and add an entry to `public/gallery/captions.json` for each filename:

```json
{
  "classroom-corner.jpg": {
    "caption": "A view of the classroom reading corner",
    "alt": "Picture books arranged on a low shelf beside a small reading rug",
    "approved": true
  }
}
```

Only files with a caption, meaningful alt text and `approved: true` appear. Obtain permission for identifiable people before publishing. The gallery is assembled at build time, so deploy again after adding or changing photos or captions. When the folder has no approved photos, illustrated placeholders remain visible.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_LAUNCH` | Set to `true` to allow indexing and publish sitemap URLs. Any other value adds `noindex` and disallows crawling. |
| `RESEND_API_KEY` | Server-only Resend API key for sending enquiries. |
| `RESEND_FROM_EMAIL` | Verified sender address configured in Resend. |
| `UPSTASH_REDIS_REST_URL` | Server-only Upstash Redis REST endpoint used by the enquiry rate limiter. |
| `UPSTASH_REDIS_REST_TOKEN` | Server-only Upstash Redis token. |

The enquiry recipient is the confirmed `school.contact.email.value`. Until the recipient, sender, Resend key and Upstash credentials are configured, the form displays a clear unavailable message and does not claim to have sent anything. Never prefix secrets with `NEXT_PUBLIC_`.

## Launch checklist

- Replace the contact, WhatsApp and office-hour placeholders with school-confirmed details.
- Confirm the school address and coordinates; check the map and directions link.
- Confirm term dates, event information, fees and key dates before adding them to public pages.
- Review all school copy, class information, school-day details and page content with the school.
- Configure Resend, its verified sender, the school recipient email and Upstash Redis credentials; submit a test enquiry and confirm delivery.
- Add only approved gallery images and PDFs. Confirm image captions, alt text and permission before deployment.
- Review the contact-page last-updated date and any optional pages; set navigation flags only when content is ready.
- Test mobile layout, keyboard access, reduced motion, contrast, form errors, map fallback and empty states.
- Run `npm run test`, `npm run lint`, `npm run typecheck` and `npm run build`.
- Capture Lighthouse mobile scores for Performance, Accessibility, Best Practices and SEO.
- Keep `NEXT_PUBLIC_LAUNCH` unset or false during preview. Set it to `true` only for the public launch.
