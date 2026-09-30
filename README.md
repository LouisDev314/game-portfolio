# Game Portfolio Starter

This independent repository starts from a copy of `my-portfolio`. Its current pages and project content still describe Louis Chan's software engineering work. Build the game portfolio here; the original `my-portfolio` repository is unchanged.

Before publishing a distinct game portfolio, replace the copied content and set its own canonical URL in `lib/site.ts`.

## Original Site

[https://www.louisdev314.com/](https://www.louisdev314.com/)

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS v4
- Motion for focused UI transitions
- Three.js, React Three Fiber, and Drei for the interactive globe
- Vercel Analytics and Speed Insights
- ESLint, TypeScript, Prettier, and pnpm

## Highlights

- Recruiter-friendly portfolio structure with dedicated home, projects, about, contact, links, uses, privacy, and terms pages.
- Data-driven project case studies for Paper Bridge and PopBox Studio, including project descriptions, technical highlights, tech stacks, and live/repo/demo links when available.
- Reusable component system for cards, modals, badges, navigation, contact actions, project cards, timelines, theme controls, and scroll/reveal interactions.
- Responsive dark/light UI built with accessible HTML content, centralized site metadata, canonical URL, Open Graph metadata, and Twitter metadata.
- Performance-oriented Next.js implementation using App Router layouts, local assets, Vercel Speed Insights, and client components only where interactivity is needed.

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Or run all three:

```bash
pnpm check
```

## Contact

- LinkedIn: [linkedin.com/in/louiscch](https://www.linkedin.com/in/louiscch/)
- Email: [louiscch314@gmail.com](mailto:louiscch314@gmail.com)

The contact form sends through Resend's email API. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in local `.env` and in Vercel Project Settings → Environment Variables for Production. The sender must be an address on the verified Resend sending domain. Messages go to the portfolio email shown above; visitor addresses are used as Reply-To.
