import { blogs } from "@/data/blogs";
import { useEffect } from "react";

export function generateBlogSitemap() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://solvezyo.com";
  
  const blogUrls = blogs.map((blog) => {
    return `
  <url>
    <loc>${baseUrl}/blog/${blog.id}</loc>
    <lastmod>${blog.modifiedDate ? new Date(blog.modifiedDate).toISOString().split('T')[0] : new Date(blog.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${blogUrls}
</urlset>`;

  return sitemap;
}

export default function SitemapGenerator() {
  useEffect(() => {
    // Generate and download sitemap
    const sitemap = generateBlogSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    console.log('Sitemap generated:');
    console.log(sitemap);
    
    // Optional: Auto-download
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'sitemap.xml';
    // a.click();
  }, []);

  return (
    <div className=\"container mx-auto px-4 py-12\">
      <h1 className=\"text-3xl font-bold mb-6\">Sitemap Generator</h1>
      <div className=\"bg-gray-100 dark:bg-gray-800 p-6 rounded-lg\">
        <pre className=\"text-xs overflow-auto max-h-96\">
          {generateBlogSitemap()}
        </pre>
      </div>
      <p className=\"mt-4 text-sm text-gray-600 dark:text-gray-400\">
        Copy the above XML and save it as sitemap.xml in your public directory.
      </p>
    </div>
  );
}
