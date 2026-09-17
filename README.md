# Wedding Invitation

A single-page wedding invitation site: hero with a live countdown, the couple's story, venues, itinerary, dress code, photo gallery, gift registry, RSVP form and guest information. Built as a real, deployable site — one page, no routing, no backend.

Everything is static, so it can be hosted anywhere that serves files.

## What works today

- **Intro and hero** with the couple's names, date and location over a full-bleed photo.
- **Live countdown** to the ceremony and the RSVP deadline.
- **Story timeline**, venues with Google Maps links, and an itinerary of the day.
- **Gallery** with carousel, keyboard navigation and a lightbox.
- **Gift registry** and collapsible guest information sections.
- **RSVP form** with validation, success and error states, plus a toast notification.
- **Accessibility work**: skip link, focus trap in modals, body-scroll lock, `prefers-reduced-motion` support, labelled fields and consistent focus rings.
- **Design tokens** in `DESIGN.md`, with measured contrast ratios instead of guessed ones.

## Status

Half the point of writing this in the open is being honest about what is missing.

- **The RSVP form does not submit anywhere.** `src/lib/submitRsvp.ts` waits 1.4 seconds and returns a success message. Wiring it to a real endpoint (Supabase, Firebase, a serverless function) means changing that one file — the form component only calls it.
- **All content is placeholder data.** Names, dates, venues, hotel codes, the bank account and the phone number in `src/data/wedding.ts` are invented. The photos are free-license Unsplash images referenced by URL in `src/data/images.ts`, not real photographs.
- **No tests yet.** No unit or end-to-end suite.
- **Single language.** The copy is in Spanish; there is no i18n layer.

## Layout

```
src/
  components/   reusable UI (buttons, fields, modals, lightbox, toasts, ...)
  sections/     one folder per page section
  data/         all copy and imagery — wedding.ts is the single source of truth
  hooks/        countdown, carousel, focus trap, scroll lock, swipe, motion-safe
  lib/          RSVP validation, submission, clipboard
  styles/       tokens, base reset, utilities
public/         static files served as-is
DESIGN.md       palette, type scale, motion tokens, contrast measurements
```

Components never hardcode copy: names, dates, times, addresses and images live in `src/data/`. To reuse this for another event, edit that folder and nothing else.

## Development

Requires Node 22 or newer.

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # type check + production build into dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which lints, builds and publishes `dist/` to GitHub Pages.

The site lives under a repository subpath, so `base` in `vite.config.ts` is set to `/wedding-invitation/`. Change that value if you rename the repository or move to a custom domain, or the deployed page will load a blank screen.

## Privacy

There is nothing private in this repository: no analytics, no cookies, no backend, no real personal data. The only external requests are the Google Fonts stylesheet in `index.html` and the Unsplash images in `src/data/images.ts`. Both are easy to self-host if you want zero third-party traffic.

## License

MIT — see [LICENSE](LICENSE).
