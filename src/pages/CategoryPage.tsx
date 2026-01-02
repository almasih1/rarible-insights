import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import logo from "@/assets/logo.png";
import { supabase } from "@/lib/supabaseClient";
import { Clock } from "lucide-react";

interface SeoCategory {
  id: string;
  slug: string;
  title: string;
  h1_text: string;
  intro_text: string;
  key_topics: string[];
  meta_title?: string;
  meta_description?: string;
}

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

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<SeoCategory | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndArticles();
    }
  }, [slug]);

  const fetchCategoryAndArticles = async () => {
    try {
      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from("seo_categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch articles for this category
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
        .eq("seo_category_id", categoryData.id)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (articlesError) throw articlesError;
      setArticles(articlesData || []);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  const canonicalUrl = `https://www.rariblenomads.info/digital-nomad-relocation/category/${category.slug}`;

  return (
    <>
      <SEOHead 
        title={category.meta_title || `${category.title} | Rarible Nomads`}
        description={category.meta_description || category.intro_text?.substring(0, 160)}
        keywords={`${category.title}, digital nomad relocation, ${category.key_topics?.join(", ")}`}
        url={canonicalUrl}
      />
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.rariblenomads.info" },
          { name: "Digital Nomad Relocation", url: "https://www.rariblenomads.info/digital-nomad-relocation" },
          { name: category.title, url: canonicalUrl }
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

        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/digital-nomad-relocation">Digital Nomad Relocation</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Category Content */}
        <main className="max-w-4xl mx-auto px-4 pb-16">
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {category.h1_text || category.title}
          </h1>

          {/* Intro Text */}
          {category.intro_text && (
            <div className="prose prose-lg max-w-none mb-12">
              {category.intro_text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Key Topics Covered */}
          {category.key_topics && category.key_topics.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Topics Covered</h2>
              <ul className="space-y-2">
                {category.key_topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 shrink-0" />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Articles List */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Articles</h2>
            
            {articles.length === 0 ? (
              <div className="text-center py-12 border border-border/30 rounded-lg">
                <p className="text-muted-foreground">No articles yet in this category. Check back soon!</p>
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
          </div>

          {/* Internal Links */}
          <div className="border-t border-border/30 pt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Categories</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/digital-nomad-relocation"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                ← Back to Digital Nomad Relocation
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
