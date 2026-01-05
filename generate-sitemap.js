// generate-sitemap.js
// Run: npm run generate-sitemap

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://mdobvixpxroyivxfjbas.supabase.co';
const supabaseKey = 'sb_publishable_8xhMc2z_VXn6nJbWvxDB-g_6KhJnlNa';

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
  try {
    console.log('Fetching articles from Supabase...');
    
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    console.log(`Found ${articles?.length || 0} published articles`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://www.rariblenomads.info/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Digital Nomad Relocation Hub -->
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Articles -->
${articles?.map(article => `  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n') || ''}
</urlset>`;

    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
    console.log(`   Homepage + Hub + ${articles?.length || 0} articles`);
    console.log(`   All URLs: https://www.rariblenomads.info/digital-nomad-relocation/{slug}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
