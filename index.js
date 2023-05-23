import fs from 'fs/promises';
import puppeteer from 'puppeteer-core';

async function none() {
  const browser = await puppeteer.launch({ executablePath: '/snap/bin/chromium' });
  const page = await browser.newPage();

  await page.goto('https://www.f5.com', { waitUntil: 'networkidle0' });
  await fs.writeFile('none.png', await page.screenshot());
  await fs.writeFile('none.content', await page.content());
  await fs.writeFile('none.cookies', JSON.stringify((await page.cookies()).sort((a, b) => a.name.localeCompare(b.name)), null, 2));
  await browser.close();
}

async function dnt() {
  const browser = await puppeteer.launch({ executablePath: '/snap/bin/chromium' });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    dnt: '1'
  });
  await page.goto('https://www.f5.com', { waitUntil: 'networkidle0' });
  await fs.writeFile('dnt.png', await page.screenshot());
  await fs.writeFile('dnt.content', await page.content());
  await fs.writeFile('dnt.cookies', JSON.stringify((await page.cookies()).sort((a, b) => a.name.localeCompare(b.name)), null, 2));
  await browser.close();
}

async function gpc() {
  const browser = await puppeteer.launch({ executablePath: '/snap/bin/chromium' });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    'sec-gpc': '1'
  });
  await page.goto('https://www.f5.com', { waitUntil: 'networkidle0' });
  await fs.writeFile('gpc.png', await page.screenshot());
  await fs.writeFile('gpc.content', await page.content());
  await fs.writeFile('gpc.cookies', JSON.stringify((await page.cookies()).sort((a, b) => a.name.localeCompare(b.name)), null, 2));
  await browser.close();
}

await none();
await dnt();
await gpc();
