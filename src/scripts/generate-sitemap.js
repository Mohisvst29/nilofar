// [ignoring loop detection]
// generate-sitemap.js – creates a sitemap.xml based on the pages in src/app
// Run with: node src/scripts/generate-sitemap.js

import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.nilofartalent.com';
const APP_PAGES_DIR = path.resolve(process.cwd(), 'src', 'app');
const PUBLIC_SITEMAP = path.resolve(process.cwd(), 'public', 'sitemap.xml');

// Recursively collect route paths from the app directory
function collectRoutes(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Skip private folders
      if (['api', 'admin', '(admin)'].includes(entry.name)) continue;
      const subBase = `${base}/${entry.name}`.replace(/\/g, '/');
      routes.push(...collectRoutes(path.join(dir, entry.name), subBase));
    } else if (entry.isFile()) {
      // Only consider .tsx or .js page files (ignore layout, globals, etc.)
      if (!entry.name.match(/page\.(tsx|jsx|js)$/)) continue;
      const route = base || '/';
      routes.push(route);
    }
  }
  return routes;
}

function generateSitemap(urls) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const footer = '</urlset>';
  const body = urls
    .map((url) => `  <url>\n    <loc>${DOMAIN}${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
    .join('\n');
  return `${header}\n${body}\n${footer}`;
}

const routes = collectRoutes(APP_PAGES_DIR);
// Ensure the homepage is included
if (!routes.includes('/')) routes.unshift('/');

const sitemapContent = generateSitemap(routes);
fs.writeFileSync(PUBLIC_SITEMAP, sitemapContent, 'utf8');
console.log('✅ sitemap.xml generated with', routes.length, 'entries.');
