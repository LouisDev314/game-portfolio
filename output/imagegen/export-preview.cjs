// Set PLAYWRIGHT_MODULE and PLAYWRIGHT_CHROMIUM_PATH if using a bundled runtime.
/* eslint-disable @typescript-eslint/no-require-imports -- This is a CommonJS export utility. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {}),
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    try {
      const page = await context.newPage();
      await page.goto(pathToFileURL(path.join(__dirname, 'portfolio-preview.html')).href);
      await page.evaluate(() => document.fonts.ready);
      const image = await page.screenshot();
      const destination = path.resolve(__dirname, '../../public/og/portfolio-preview.png');
      await sharp(image).png({ compressionLevel: 9, effort: 10 }).toFile(destination);
      console.log(JSON.stringify(await sharp(destination).metadata(), null, 2));
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
