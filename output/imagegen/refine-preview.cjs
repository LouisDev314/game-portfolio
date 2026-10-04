/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS image refinement utility. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');

(async () => {
  const destination = path.resolve(__dirname, '../../public/og/portfolio-preview.png');
  const baselinePath = process.env.OG_BASELINE_IMAGE || path.join(__dirname, 'portfolio-preview-baseline.png');
  const baseline = await sharp(baselinePath).removeAlpha().raw().toBuffer();
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH });
  try {
    const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    try {
      const page = await context.newPage();
      await page.goto(pathToFileURL(path.join(__dirname, 'portfolio-preview.html')).href);
      await page.evaluate(() => document.fonts.ready);
      const rendered = await sharp(await page.screenshot()).removeAlpha().raw().toBuffer();
      // Capture glyph masks so every pixel outside the old/new text stays exact.
      await page.addStyleTag({ content: 'html, body { background: transparent !important; } .art, .shade, .frame, h1, .accent { visibility: hidden !important; } .role, .support { color: white !important; }' });
      const newMask = await sharp(await page.screenshot({ omitBackground: true })).ensureAlpha().raw().toBuffer();
      await page.addStyleTag({ content: '.role { letter-spacing: 0.24em !important; }' });
      const oldMask = await sharp(await page.screenshot({ omitBackground: true })).ensureAlpha().raw().toBuffer();
      const result = Buffer.from(baseline);
      let changed = 0;
      for (let pixel = 0; pixel < 1200 * 630; pixel++) {
        if (!newMask[pixel * 4 + 3] && !oldMask[pixel * 4 + 3]) continue;
        const start = pixel * 3;
        if (result[start] !== rendered[start] || result[start + 1] !== rendered[start + 1] || result[start + 2] !== rendered[start + 2]) changed++;
        rendered.copy(result, start, start, start + 3);
      }
      await sharp(result, { raw: { width: 1200, height: 630, channels: 3 } }).png({ palette: false, compressionLevel: 9 }).toFile(destination);
      const saved = await sharp(destination).removeAlpha().raw().toBuffer();
      let outside = 0;
      for (let pixel = 0; pixel < 1200 * 630; pixel++) {
        if (newMask[pixel * 4 + 3] || oldMask[pixel * 4 + 3]) continue;
        const start = pixel * 3;
        if (saved[start] !== baseline[start] || saved[start + 1] !== baseline[start + 1] || saved[start + 2] !== baseline[start + 2]) outside++;
      }
      if (outside) throw new Error('Artwork pixels changed outside text glyphs.');
      fs.writeFileSync(path.join(__dirname, 'typography-verification.json'), JSON.stringify({ changedTextPixels: changed, changedPixelsOutsideTextGlyphs: outside, supportingText: { from: '#a3a3a3', to: '#b7b7b7', brightnessIncreasePercent: 12.27 }, roleTracking: { from: '0.24em', to: '0.20em' } }, null, 2));
      console.log('PASS: ' + changed + ' text pixels refined; zero pixels changed outside the two text lines.');
    } finally { await context.close(); }
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
