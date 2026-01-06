import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";
import logo from "@/assets/logo.png";
import { Share2, Clock, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  icon: string;
  read_time: number;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    color: string;
  };
  seo_category?: {
    id: string;
    title: string;
    slug: string;
  };
  author?: {
    name: string;
    twitter_url?: string;
    instagram_url?: string;
    youtube_url?: string;
    linkedin_url?: string;
  };
  summary_points?: {
    point_text: string;
    order_index: number;
  }[];
}

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          category:categories(name, color),
          seo_category:seo_categories(id, title, slug),
          author:authors(name, twitter_url, instagram_url, youtube_url, linkedin_url),
          summary_points:article_summary_points(point_text, order_index)
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;

      setArticle(data);

      // Increment views
      if (data.id) {
        await supabase.rpc("increment_article_views", { article_id: data.id });
      }

      // Fetch related articles
      if (data.category_id) {
        const { data: related } = await supabase
          .from("articles")
          .select(`
            id,
            slug,
            title,
            icon,
            created_at,
            category:categories(name, color)
          `)
          .eq("category_id", data.category_id)
          .eq("status", "published")
          .neq("id", data.id)
          .limit(4);

        if (related) setRelatedArticles(related);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Article link copied to clipboard",
        });
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Article not found</p>
      </div>
    );
  }

  const sortedSummaryPoints = article.summary_points?.sort(
    (a, b) => a.order_index - b.order_index
  );

  // Canonical URL - CRITICAL for SEO
  const canonicalUrl = `https://www.rariblenomads.info/digital-nomad-relocation/${article.slug}`;

  return (
    <>
      <SEOHead 
        title={`${article.title} | Rarible Insights`}
        description={article.summary_points?.map(p => p.point_text).join(". ") || article.title}
        keywords={`${article.category?.name}, ${article.title}, digital nomads, relocation, lifestyle`}
        url={canonicalUrl}
        article={true}
        author={article.author?.name}
        publishedTime={article.created_at}
        category={article.category?.name}
      />
      
      <ArticleSchema 
        title={article.title}
        description={article.summary_points?.map(p => p.point_text).join(". ") || article.title}
        image="https://www.rariblenomads.info/og-image.jpg"
        author={article.author?.name || "Rarible Insights"}
        publishedTime={article.created_at}
        modifiedTime={article.updated_at}
        category={article.category?.name || "Uncategorized"}
        url={canonicalUrl}
      />
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.rariblenomads.info" },
          { name: "Digital Nomad Relocation", url: "https://www.rariblenomads.info/digital-nomad-relocation" },
          { name: article.title, url: canonicalUrl }
        ]}
      />
      
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-foreground">rarible insights</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-3xl mx-auto px-4 py-6">
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
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 pb-16">
        <article className="relative">
          {/* Share Button - Top Right */}
          <div className="absolute -right-16 top-0 hidden lg:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full hover:bg-muted"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl mb-6">
            {article.icon}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground">
              {new Date(article.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.read_time} min read</span>
            </div>
            {article.category && (
              <>
                <span className="text-muted-foreground">·</span>
                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-0.5 rounded font-medium ${article.category.color}`}
                >
                  {article.category.name}
                </Badge>
              </>
            )}
          </div>

          {/* Author */}
          {article.author && (
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {article.author.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{article.author.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {article.author.twitter_url && (
                    <a
                      href={article.author.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {article.author.instagram_url && (
                    <a
                      href={article.author.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {article.author.youtube_url && (
                    <a
                      href={article.author.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {article.author.linkedin_url && (
                    <a
                      href={article.author.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              {/* Mobile Share Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="rounded-full hover:bg-muted lg:hidden"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Summary Bullets */}
          {sortedSummaryPoints && sortedSummaryPoints.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h2 className="text-sm font-semibold text-foreground mb-3">In This Article:</h2>
              <ul className="space-y-2">
                {sortedSummaryPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                    <span>{point.point_text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Related Guide - Link to Hub */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Related guide</p>
            <Link 
              to="/digital-nomad-relocation"
              className="text-primary hover:underline font-medium"
            >
              Digital Nomad Relocation Hub →
            </Link>
          </div>

          {/* Filed Under - Link to Category */}
          {article.seo_category && (
            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                Filed under:{" "}
                <Link
                  to={`/digital-nomad-relocation/category/${article.seo_category.slug}`}
                  className="text-primary hover:underline font-medium"
                >
                  {article.seo_category.title}
                </Link>
              </p>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/30">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/digital-nomad-relocation/${related.slug}`}
                    className="group border border-border/30 rounded-lg p-4 hover:border-border hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                        {related.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2 mb-1">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {new Date(related.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {related.category && (
                            <>
                              <span>·</span>
                              <Badge
                                variant="outline"
                                className={`text-xs px-1.5 py-0 rounded ${related.category.color}`}
                              >
                                {related.category.name}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Article;
