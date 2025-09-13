import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import * as cheerio from 'cheerio'

// Pages are served from repo root in your CI
const PAGES = [
  'index.html',
  'about.html',
  'recipes.html',
  'contact.html',
  'recipes/spaghetti.html'
]

function load(file) {
  const html = readFileSync(join('.', file), 'utf8')
  return cheerio.load(html)
}

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
