/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS browser verification utility. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const base = process.env.TEST_BASE_URL || 'http://localhost:3001';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {}),
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      const response = await page.goto(base, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const html = await response.text();
      const expected = {
        'og:type': 'website',
        'og:site_name': 'Louis Chan',
        'og:title': 'Louis Chan — Game Designer',
        'og:description': 'Game designer focused on narrative, gameplay, environmental storytelling, and level design.',
        'og:image': 'https://louischan.site/og/portfolio-preview.png',
        'og:image:width': '1200',
        'og:image:height': '630',
        'twitter:card': 'summary_large_image',
        'twitter:title': 'Louis Chan — Game Designer',
        'twitter:description': 'Game designer focused on narrative, gameplay, environmental storytelling, and level design.',
        'twitter:image': 'https://louischan.site/og/portfolio-preview.png',
      };
      for (const [key, value] of Object.entries(expected)) {
        const tag = page.locator(`meta[property="${key}"], meta[name="${key}"]`);
        assert.equal(await tag.count(), 1, key);
        assert.equal(await tag.getAttribute('content'), value, key);
        assert.ok(html.includes(value), `${key} in server HTML`);
      }
      assert.equal(await page.title(), expected['og:title']);
      assert.equal(await page.locator('footer a[href="/projects/last-remains"]').count(), 1);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://louischan.site');
      const imageResponse = await context.request.get(`${base}/og/portfolio-preview.png`);
      assert.equal(imageResponse.status(), 200);
      assert.match(imageResponse.headers()['content-type'], /image\/png/);
      const image = await imageResponse.body();
      const imageInfo = await sharp(image).metadata();
      assert.equal(imageInfo.width, 1200);
      assert.equal(imageInfo.height, 630);
      for (const asset of ['/paper-bridge-logo.webp', '/store-logo.png']) {
        assert.equal((await context.request.get(`${base}${asset}`)).status(), 200, `restored asset: ${asset}`);
      }
      await page.screenshot({ path: 'output/playwright/social-home.png' });
      const routes = ['/', '/about', '/projects', '/projects/last-remains', '/projects/paper-bridge', '/projects/popbox-studio', '/blogs/buying-time-resident-evil-4-remake'];
      for (const route of routes) {
        const result = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
        assert.equal(result.status(), 200, route);
        assert.doesNotMatch(await page.locator('body').innerText(), /louisdev314/i, route);
        if (route === '/' || route === '/about') assert.match(await page.locator('body').innerText(), /software engineering background/i);
        if (route === '/about') {
          for (const id of ['popbox-studio', 'bmo', 'earn-alliance', 'vgt', 'future-successors', 'microsoft']) {
            assert.equal(await page.locator(`#${id}-role`).count(), 1, `restored experience: ${id}`);
          }
        }
        if (route === '/about') await page.screenshot({ path: 'output/playwright/social-about.png', fullPage: true });
      }
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://louischan.site/blogs/buying-time-resident-evil-4-remake');
      await page.setViewportSize({ width: 390, height: 844 });
      for (const route of ['/', '/about', '/projects']) {
        await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `mobile overflow: ${route}`);
      }
      await sharp(image).resize(400, 210).png().toFile('output/playwright/social-thumbnail.png');
      fs.writeFileSync('output/playwright/social-preview-results.json', JSON.stringify({ metadata: expected, image: { width: imageInfo.width, height: imageInfo.height, bytes: image.length }, routes, mobileOverflow: false, articleCanonical: 'preserved' }, null, 2));
      console.log('PASS: production HTML metadata, static PNG, route content, article canonical, and mobile layout.');
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
