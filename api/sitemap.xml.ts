// api/sitemap.xml.ts
// Vercel Serverless Function для динамического sitemap
// STRICT REQUIREMENTS:
// - HTTP 200 OK
// - Content-Type: application/xml
// - Valid XML per https://www.sitemaps.org/protocol.html

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const baseUrl = 'https://www.rariblenomads.info';
    const today = new Date().toISOString().split('T')[0];

  // SEO Category pages (hardcoded - всегда актуальные)
  const categoryPages = [
    'visas-residency',
    'taxes-legal',
    'banking-finance',
    'healthcare-insurance',
    'cost-living-housing',
    'remote-work-income',
    'safety-infrastructure',
  ];

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/digital-nomad-relocation', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
    { url: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
    { url: '/editorial-policy', priority: '0.5', changefreq: 'monthly' },
    { url: '/newsletter', priority: '0.6', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/documents-needed', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/digital-nomad-visas', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/relocation-timeline', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/relocation-cost', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/country-guides', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/nomad-taxes', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/healthcare-insurance', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/banking-abroad', priority: '0.7', changefreq: 'monthly' },
    { url: '/digital-nomad-relocation/relocation-mistakes', priority: '0.7', changefreq: 'monthly' },
  ];

  // Fetch articles from Supabase
  let articles: any[] = [];
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/articles?status=eq.published&select=slug,updated_at`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );

      if (response.ok) {
        articles = await response.json();
      }
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  ${staticPages
    .map(
      (page) => `<url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n  ')}
  
  ${categoryPages
    .map(
      (slug) => `<url>
    <loc>${baseUrl}/digital-nomad-relocation/category/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n  ')}
  
  ${articles
    .map(
      (article) => `<url>
    <loc>${baseUrl}/digital-nomad-relocation/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n  ')}
  
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap generation failed</error>');
  }
}
