# Hakies Infant School website

A responsive Next.js App Router website built with TypeScript and Tailwind CSS. School-specific content is centralised in `src/lib/content.ts`. The visual illustrations are CSS compositions and clearly replaceable placeholders; no stock or pupil photography is presented as Hakies imagery.

## Run locally

- `npm install`
- `npm run dev` to start the development server
- `npm run typecheck` to check TypeScript
- `npm run build` to create a production build
- `npm start` to serve the production build

## Before launch

Confirm the school's address, telephone, email, office hours, story, values, headteacher welcome, curriculum, class names and age ranges, typical day, care and wellbeing information, admissions process, entry requirements, dates and fees, parent resources, event content, and approved public photographs. Replace labelled content in `src/lib/content.ts` and the page sections. The admissions/contact form is a demonstration and does not send messages; configure a trusted form or email backend before enabling live enquiries. No environment variables are currently required.

Metadata is configured per route. Robots are set to no-index by default for preview safety. Add verified school contact/location data before adding School structured data, maps or a public sitemap. Policy links and downloads are omitted until approved documents exist.
