/* eslint-disable @typescript-eslint/no-require-imports -- This is a CommonJS browser verification utility. */
const { chromium } = require('C:/Users/louis/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/louis/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe' });
  const results = [];
  try {
    for (const [width, height] of [[3840,2160],[3840,1600],[1920,1080],[1440,900],[768,1024],[390,844]]) {
      const context = await browser.newContext({viewport:{width,height}, reducedMotion:'reduce', colorScheme:'dark'});
      try {
        const page = await context.newPage();
        await page.goto('http://localhost:3000', {waitUntil:'networkidle'});
        await page.waitForTimeout(1800);
        const hero = await page.locator('main > section').first().evaluate(el => {
          const box = el.getBoundingClientRect();
          const first = el.firstElementChild.getBoundingClientRect();
          const last = el.lastElementChild.getBoundingClientRect();
          return {top:box.top,height:box.height,contentCenter:(first.top+last.bottom)/2,viewportHeight:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth};
        });
        if (Math.abs(hero.contentCenter-height/2)>2 || hero.overflow) throw new Error(`Hero layout ${width}: ${JSON.stringify(hero)}`);
        if (width===3840 && height===2160) await page.screenshot({path:'output/playwright/wide-home.png'});
        await page.goto('http://localhost:3000/about', {waitUntil:'networkidle'});
        await page.waitForTimeout(600);
        const timeline = await page.locator('section[aria-labelledby="work-experience-heading"]').evaluate(el => {
          const cards = [...el.querySelectorAll('article')];
          return {overflow:document.documentElement.scrollWidth>innerWidth, cards:cards.map(card=>{
            const box=card.getBoundingClientRect();
            const row=card.parentElement.parentElement;
            const date = row.querySelector('h3').getBoundingClientRect();
            return {width:box.width,left:box.left,right:box.right,dateDelta:date.top-box.top};
          })};
        });
        if (timeline.overflow || timeline.cards.some(c=>c.left<0 || c.right>width || (width>=768 && Math.abs(c.dateDelta)>1))) throw new Error(`Timeline layout ${width}: ${JSON.stringify(timeline)}`);
        const lastCard = page.locator('article').last();
        await lastCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        if (width===3840 && height===2160) await page.screenshot({path:'output/playwright/wide-timeline.png'});
        results.push({width,height,hero,timeline});
      } finally { await context.close(); }
    }
    fs.writeFileSync('output/playwright/wide-layout-results.json', JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
  } finally { await browser.close(); }
})().catch(err=>{console.error(err);process.exitCode=1;});
