# Louis Chan — Game Design Portfolio

My personal portfolio showcasing game design, production experience, and software development. It brings together selected projects, game analysis, and an interactive browser game, with a focus on narrative, gameplay, level design, and player experience.

[Visit the portfolio](https://louischan.site/) · [LinkedIn](https://www.linkedin.com/in/louiscch/) · [itch.io](https://louischan.itch.io/)

## Features

- **Project showcases:** dedicated pages for Last Remains, Paper Bridge, and PopBox Studio, with role highlights, media, and project links.
- **Design writing:** categorized Design Notes and Game Analysis, including an illustrated Resident Evil 4 breakdown.
- **Orbit:** a desktop Three.js arena game built around surviving 30 seconds. Use WASD to move, the mouse to aim, click or hold to fire, Tab to pause, and R to restart after a run ends.
- **About and experience:** background, work timeline, tools, and contact links.
- **Responsive presentation:** light and dark themes, animated transitions, smooth scrolling, and reduced-motion support.
- **Contact form:** server-side email delivery through Resend.
- **Site metadata and monitoring:** canonical and social metadata, Vercel Analytics, and Speed Insights.

Additional routes include links, uses, privacy, and terms. The guestbook currently displays a coming-soon placeholder.

## Tech stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 and Radix UI
- Motion and Lenis
- Three.js, React Three Fiber, and Drei
- Resend email API
- pnpm, ESLint, and Prettier

## Local development

With Node.js and pnpm installed:

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The portfolio runs without email credentials; sending a contact message requires the configuration below. Orbit requires a desktop mouse and keyboard, WebGL, and pointer-lock support.

### Contact form configuration

Copy `.env.example` to `.env.local` and set:

```dotenv
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=portfolio@your_verified_domain.com
```

Use a sender address on a domain verified in the Resend account associated with the API key. Messages are delivered to `siteConfig.email`; the visitor's address is used as Reply-To. Keep credentials out of version control.

## Checks and production build

```bash
pnpm lint
pnpm typecheck
node --test tests/arena.test.mjs
pnpm build
```

`pnpm check` runs lint, type checking, and the production build. The arena tests run separately and exercise gameplay, pause/restart behavior, and resource cleanup with mocked browser rendering.

To serve the production build locally:

```bash
pnpm start
```

## Project structure

```text
app/            Pages, layouts, global styles, and the contact API route
components/     Portfolio UI, navigation, article rendering, and Orbit UI
lib/            Site configuration, project data, blog content, and game engine
hooks/          Shared React hooks
public/         Images, project videos, and article media
assets/         Custom icon components
tests/          Arena engine tests
docs/           Editorial review and performance notes
```

## Updating content

- Edit `lib/site.ts` for the site URL, metadata, contact address, and social links.
- Edit `lib/projects.ts` for project descriptions, highlights, media, and external links.
- Register articles in `lib/blogs.ts` and keep article content in `lib/articles/`.
- Add images and videos to `public/`, then reference them with paths beginning with `/`.
- Update the home and about pages and `components/WorkTimeline.tsx` for personal background and experience.
- Edit `components/ArenaGame.tsx` for Orbit's interface and `lib/game/arena.ts` for gameplay.

## Deployment

Deploy as a Next.js application, with Vercel as the intended hosting platform. Configure the two Resend environment variables in the deployment environment to enable the contact form, then redeploy after changing them.

The public portfolio link above uses `https://louischan.site/`. The canonical URL in `lib/site.ts` currently remains `https://www.louisdev314.com/`; update it to the intended production domain so generated metadata matches the deployment.

## Contact

[louiscch314@gmail.com](mailto:louiscch314@gmail.com) · [LinkedIn](https://www.linkedin.com/in/louiscch/)
