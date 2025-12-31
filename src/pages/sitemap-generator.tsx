// src/pages/Sitemap.tsx
// Динамический sitemap генератор

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const Sitemap = () => {
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

      // Generate XML
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://www.rariblenomads.info/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  
  <!-- Articles -->
${articles?.map(article => `  <url>
    <loc>https://www.rariblenomads.info/article/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n') || ''}
</urlset>`;

      // Download as file
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      a.click();
    } catch (error) {
      console.error("Error generating sitemap:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Generating sitemap...</p>
    </div>
  );
};

export default Sitemap;
