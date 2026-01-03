// src/pages/sitemap-generator.tsx
// Динамический sitemap генератор с SEO категориями

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const SitemapGenerator = () => {
  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    try {
      // Fetch all published articles
      const { data: articles } = await supabase
        .from("articles")
        .select("slug, updated_at")
        .eq("status", "published")
        .order("updated_at", { ascending: false });

      // Fetch all active SEO categories
      const { data: categories } = await supabase
        .from("seo_categories")
        .select("slug")
        .eq("is_active", true)
        .order("order_index");

      const today = new Date().toISOString().split('T')[0];

      // Generate XML
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>https://www.rariblenomads.info/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Digital Nomad Relocation Hub -->
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- SEO Category Pages -->
${categories?.map(category => `  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/category/${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n') || ''}
  
  <!-- Articles -->
${articles?.map(article => `  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n') || ''}
  
  <!-- Static Pages -->
  <url>
    <loc>https://www.rariblenomads.info/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/disclaimer</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/editorial-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/newsletter</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Footer Static Guide Pages -->
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/documents-needed</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/digital-nomad-visas</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/relocation-timeline</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/relocation-cost</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/country-guides</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/nomad-taxes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/healthcare-insurance</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/banking-abroad</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.rariblenomads.info/digital-nomad-relocation/relocation-mistakes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>`;

      // Download as file
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      a.click();
      
      console.log("✅ Sitemap generated successfully!");
      console.log(`📊 Total URLs: ${(articles?.length || 0) + (categories?.length || 0) + 16}`);
    } catch (error) {
      console.error("❌ Error generating sitemap:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Generating sitemap...</p>
        <p className="text-xs text-muted-foreground">File will download automatically</p>
      </div>
    </div>
  );
};

export default SitemapGenerator;
