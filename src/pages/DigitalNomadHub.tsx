import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import logo from "@/assets/logo.png";
import { supabase } from "@/lib/supabaseClient";
import { Clock } from "lucide-react";

interface Article {
  id: string;
  slug: string;
  title: string;
  icon: string;
  read_time: number;
  created_at: string;
  category?: {
    name: string;
    color: string;
  };
}

interface SeoCategory {
  id: string;
  slug: string;
  title: string;
  order_index: number;
}

const DigitalNomadHub = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [seoCategories, setSeoCategories] = useState<SeoCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch SEO categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("seo_categories")
        .select("id, slug, title, order_index")
        .eq("is_active", true)
        .order("order_index");

      if (categoriesError) throw categoriesError;
      setSeoCategories(categoriesData || []);

      // Fetch articles
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select(`
          id,
          slug,
          title,
          icon,
          read_time,
          created_at,
          category:categories(name, color)
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (articlesError) throw articlesError;
      setArticles(articlesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Digital Nomad Relocation Guide | Rarible Nomads"
        description="Comprehensive guides, checklists, and resources for digital nomads planning relocation. Visas, taxes, documents, and country comparisons."
        keywords="digital nomad relocation, visa requirements, tax optimization, remote work, international living"
        url="https://www.rariblenomads.info/digital-nomad-relocation"
      />
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.rariblenomads.info" },
          { name: "Digital Nomad Relocation", url: "https://www.rariblenomads.info/digital-nomad-relocation" }
        ]}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold text-foreground">Rarible Nomads</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Digital Nomad Relocation
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Expert guides, checklists, and insights to help you relocate as a digital nomad.
          </p>
          <p className="text-lg text-muted-foreground">
            From visas to taxes, we've got you covered.
          </p>
        </section>

        {/* SEO Categories Section */}
        <section className="max-w-4xl mx-auto px-4 pb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Topic</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seoCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/digital-nomad-relocation/category/${category.slug}`}
                  className="block border border-border/30 rounded-lg p-5 hover:border-border hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-foreground hover:text-foreground/80 transition-colors">
                    {category.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Articles Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Articles</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/digital-nomad-relocation/${article.slug}`}
                  className="block"
                >
                  <article className="border border-border/30 rounded-lg p-6 hover:border-border hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                        {article.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-foreground mb-2 hover:text-foreground/80 transition-colors">
                          {article.title}
                        </h3>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>
                            {new Date(article.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span>·</span>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.read_time} min read</span>
                          </div>
                          {article.category && (
                            <>
                              <span>·</span>
                              <Badge
                                variant="outline"
                                className={`text-xs px-2 py-0.5 rounded ${article.category.color}`}
                              >
                                {article.category.name}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DigitalNomadHub;
