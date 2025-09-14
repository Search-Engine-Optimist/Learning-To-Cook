import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import cheerio from 'cheerio';

import { expect } from 'vitest';

  test('basic math works', () => {
  expect(1 + 1).toBe(2);
});

function load(file) {
  if (!existsSync(join('.', file))) throw new Error(`Missing file: ${file}`);
  const html = readFileSync(join('.', file), 'utf8');
  return cheerio.load(html);
}
  
const PAGES = [
  'index.html',
  'about.html',
  'recipes.html',
  'contact.html',
  'recipes/spaghetti.html'
]
test('vitest can run tests', () => {
  expect(1).toBe(1)
})


test('each page has <html lang>, charset, viewport, title, main', () => {
  for (const file of PAGES) {
    const $ = load(file)
    expect($('html[lang]').length).toBeGreaterThan(0)
    expect($('meta[charset]').length).toBeGreaterThan(0)
    expect($('meta[name="viewport"]').length).toBeGreaterThan(0)
    expect($('title').first().text().trim().length).toBeGreaterThan(0)
    expect($('main').length).toBeGreaterThan(0)
  }
})

test('recipe detail images have meaningful alt text', () => {
  const $ = load('recipes/spaghetti.html')
  $('img').each((_, el) => {
    const alt = $(el).attr('alt')
    expect(alt && alt.trim().length).toBeGreaterThan(0)
  
  })
})

test('contact form fields have associated labels', () => {
  const $ = load('contact.html')
  $('input,textarea,select').each((_, el) => {
    const id = $(el).attr('id')
    if (id) expect($(`label[for="${id}"]`).length).toBeGreaterThan(0)
  })
})

test('headings don’t skip levels on About', () => {
  const $ = load('about.html')
  const levels = $('h1,h2,h3').map((_, el) => Number(el.tagName[1])).get()
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
  }
})
const isExternal = (u = '') =>
  /^(https?:)?\/\//i.test(u) || u.startsWith('data:') || u.startsWith('blob:')

const stripQueryHash = (u = '') => u.split('#')[0].split('?')[0]

function checkCandidate(relUrl, pageFile, errors) {
  if (!relUrl) return
  const url = stripQueryHash(relUrl.trim())
  if (!url || isExternal(url)) return

  const baseDir = dirname(pageFile)
  const absPath = url.startsWith('/')
    ? join('.', url.replace(/^\/+/, ''))    // '/images/x.jpg' -> './images/x.jpg'
    : normalize(join('.', baseDir, url))    // relative to the page

  if (!existsSync(absPath)) {
    errors.push(`[${pageFile}] missing image asset: ${url} → ${absPath}`)
  }
}

test('all <img> src/srcset files exist locally', () => {
  const allErrors = []

  for (const page of PAGES) {
    const $ = load(page)

    $('img').each((_, el) => {
      // src
      checkCandidate($(el).attr('src'), page, allErrors)

      // srcset (e.g. "img@1x.jpg 1x, img@2x.jpg 2x")
      const srcset = $(el).attr('srcset')
      if (srcset) {
        srcset.split(',').forEach(entry => {
          const candidate = entry.trim().split(/\s+/)[0]
          checkCandidate(candidate, page, allErrors)
        })
      }
    })
  }

  if (allErrors.length) {
    throw new Error('\n' + allErrors.join('\n'))
  }
})
