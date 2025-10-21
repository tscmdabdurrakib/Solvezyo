import fs from 'fs';
import path from 'path';

// --- Configuration ---
const BASE_URL = 'https://solvezyo.com';
const ROUTES_FILE_PATH = 'src/App.tsx';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILE = 'sitemap.xml';

// --- Helper Functions ---

/**
 * Extracts static routes from the React Router configuration file.
 * @param filePath - Path to the router configuration file.
 * @returns An array of static route paths.
 */
function extractRoutes(filePath: string): string[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Regex to find all `path` props from <Route> components
    const routePathRegex = /<Route\s+path="([^"]+)"/g;
    const paths = new Set<string>();
    let match;

    while ((match = routePathRegex.exec(fileContent)) !== null) {
      const path = match[1];
      // Exclude dynamic routes (containing ':') and wildcard routes
      if (!path.includes(':') && path !== '*') {
        paths.add(path);
      }
    }
    
    return Array.from(paths);
  } catch (error) {
    console.error(`Error reading or parsing routes file at ${filePath}:`, error);
    return [];
  }
}

/**
 * Generates the XML content for the sitemap.
 * @param routes - An array of route paths.
 * @returns The complete sitemap XML as a string.
 */
function generateSitemapXml(routes: string[]): string {
  // Handle the homepage separately for higher priority
  const homeUrl = `
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  const otherUrls = routes
    .filter(route => route !== '/') // Exclude homepage, it's handled separately
    .map(route => {
      const url = `${BASE_URL}${route}`;
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${homeUrl}${otherUrls}
</urlset>`;
}

// --- Main Execution ---

function main() {
  console.log('Generating sitemap...');

  const routes = extractRoutes(ROUTES_FILE_PATH);
  if (routes.length === 0) {
    console.error('No static routes found. Sitemap generation aborted.');
    return;
  }
  
  const sitemapContent = generateSitemapXml(routes);
  
  const outputFilePath = path.join(OUTPUT_DIR, OUTPUT_FILE);

  // Ensure the output directory exists. The script runs after build, so it should exist.
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, sitemapContent, 'utf8');

  console.log(`Sitemap successfully generated at ${outputFilePath}`);
  console.log(`Included ${routes.length} static routes.`);
}

main();