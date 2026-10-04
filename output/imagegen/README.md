# Portfolio social preview

`portfolio-background.png` is original artwork generated with the built-in image tool. The tool does not expose a model selector, so a specific model version could not be verified. It is illustrative architecture, not gameplay or an image from a portfolio project.

`portfolio-preview.html` composites the site's system-sans font stack, 900-weight tightly tracked name, uppercase 600-weight role, neutral palette, rounded border, and small amber accent. `export-preview.cjs` exports the layout through isolated Playwright Chromium, closes its context and browser, and losslessly compresses the static PNG with Sharp. The published asset is `public/og/portfolio-preview.png` (1200 × 630).

To export again, run `node output/imagegen/export-preview.cjs` with Playwright available. For a bundled installation, set `PLAYWRIGHT_MODULE` to its module path and `PLAYWRIGHT_CHROMIUM_PATH` to a managed Chromium executable. Do not use a personal browser profile. Sharp is resolved from Next.js's existing dependency; no application dependency was added.

The generation prompt is saved in `prompt.txt`. Production verification is in `output/playwright/verify-social-preview.cjs`, using the same Playwright environment settings and `TEST_BASE_URL` (defaults to port 3001).

The typography refinement changes only the supporting line from `#a3a3a3` to `#b7b7b7` (about 12% brighter) and role tracking from `0.24em` to `0.20em`. Run `node output/imagegen/refine-preview.cjs` with the same Playwright settings to reproduce the final refined asset. It uses `portfolio-preview-baseline.png` and old/new glyph masks to preserve every pixel outside the two edited text lines exactly. `typography-verification.json` records the pixel comparison. No artwork was regenerated.
