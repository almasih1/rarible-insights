import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SidebarAd from "@/components/SidebarAd";
import ArticleCard from "@/components/ArticleCard";
import CategoryTags from "@/components/CategoryTags";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { Search, Plus, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const ARTICLES_PER_PAGE = 9;
const FEATURED_CATEGORIES = ["Digital Nomads", "Geo Politics", "Solopreneur", "Treasury Desk"];

interface Article {
  id: string;
  title: string;
  slug: string;
  icon: string;
  created_at: string;
  category?: {
    name: string;
    color: string;
  };
}

interface Ad {
  id: string;
  name: string;
  icon: string;
  description: string;
  url?: string;
  bg_color: string;
}

const Index = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [leftAds, setLeftAds] = useState<Ad[]>([]);
  const [rightAds, setRightAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchArticles();
    fetchAds();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          icon,
          created_at,
          category:categories(name, color)
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const { data: leftData, error: leftError } = await supabase
        .from("ads")
        .select("*")
        .eq("position", "left")
        .eq("is_active", true)
        .order("order_index");

      if (leftError) throw leftError;
      setLeftAds(leftData || []);

      const { data: rightData, error: rightError } = await supabase
        .from("ads")
        .select("*")
        .eq("position", "right")
        .eq("is_active", true)
        .order("order_index");

      if (rightError) throw rightError;
      setRightAds(rightData || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setSubscribing(true);

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from("subscribers")
        .select("id")
        .eq("email", email)
        .single();

      if (existing) {
        toast({
          title: "Already subscribed!",
          description: "This email is already on our list.",
        });
        setEmail("");
        setSubscribing(false);
        return;
      }

      // Insert new subscriber
      const { error } = await supabase
        .from("subscribers")
        .insert([{ 
          email,
          status: "active"
        }]);

      if (error) throw error;

      toast({
        title: "Success! 🎉",
        description: "You've been subscribed to Rarible Insights!",
      });
      setEmail("");
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const filteredArticles = selectedCategory 
    ? articles.filter((a) => a.category?.name === selectedCategory) 
    : articles;
    
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const formattedArticles = visibleArticles.map(article => ({
    id: article.id,
    icon: article.icon,
    title: article.title,
    date: new Date(article.created_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    category: article.category?.name || "Uncategorized",
    categoryColor: article.category?.color || "bg-gray-100 text-gray-700 border-gray-200",
  }));

  return (
    <>
      <SEOHead 
        title="Rarible Insights - Smart Lifestyle, Relocation & Tax Decisions"
        description="Expert insights on digital nomad lifestyle, geopolitics, treasury strategies, and solopreneur success. Join 1,851+ readers making smarter decisions."
        keywords="digital nomads, geopolitics, treasury desk, solopreneur, relocation, tax optimization, lifestyle design, remote work, financial freedom, AI search optimization"
        url="https://your-domain.com"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      
      <div className="min-h-screen bg-background">
      <div className="flex w-full">
        {/* Left Sidebar */}
        <aside className="hidden xl:block w-56 p-4 shrink-0">
          <div className="sticky top-4 flex flex-col gap-4">
            {leftAds.map((ad) => (
              <SidebarAd
                key={ad.id}
                icon={ad.icon}
                name={ad.name}
                description={ad.description}
                bgColor={ad.bg_color}
                url={ad.url}
              />
            ))}
          </div>
        </aside>

        {/* Center Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="pt-6 pb-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight text-foreground">
                rarible{" "}
                <span className="relative inline-block z-0">
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[45%] bg-orange-200/70"
                    style={{ zIndex: -1 }}
                  ></span>
                  <span className="relative z-10">insights</span>
                </span>
              </h1>

              <p className="text-muted-foreground mb-8">
                How to make smarter lifestyle, relocation, and tax decisions. Join 1,851 readers.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center justify-center gap-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribing}
                    className="pl-11 pr-5 h-11 rounded-xl border border-border/30 bg-card shadow-sm focus-visible:ring-1 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={subscribing}
                  className="h-11 px-5 rounded-xl font-medium gap-2 bg-foreground text-background hover:bg-foreground/90"
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>

              <div className="flex items-center justify-center gap-2 mt-6 text-sm flex-wrap">
                {FEATURED_CATEGORIES.map((cat, i) => (
                  <span key={cat} className="flex items-center gap-2">
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className={`transition-colors hover:text-foreground ${
                        selectedCategory === cat ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                    {i < FEATURED_CATEGORIES.length - 1 && <span className="text-muted-foreground">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Article Cards Grid */}
          <section className="py-8 px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : formattedArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formattedArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
                      className="px-5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>

          <CategoryTags selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
          <Footer />
        </div>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-56 p-4 shrink-0">
          <div className="sticky top-4 flex flex-col gap-4">
            {rightAds.map((ad) => (
              <SidebarAd
                key={ad.id}
                icon={ad.icon}
                name={ad.name}
                description={ad.description}
                bgColor={ad.bg_color}
                url={ad.url}
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default Index;
