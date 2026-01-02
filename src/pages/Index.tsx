import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import { Link } from "react-router-dom";

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

interface SeoCategory {
  slug: string;
  title: string;
  order_index: number;
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
  const [subscriberCount, setSubscriberCount] = useState(1851);
  const [displayCount, setDisplayCount] = useState(1851);
  const [seoCategories, setSeoCategories] = useState<SeoCategory[]>([]);

  useEffect(() => {
    fetchArticles();
    fetchAds();
    fetchSubscriberCount();
    fetchSeoCategories();
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

  const fetchSubscriberCount = async () => {
    try {
      const { count, error } = await supabase
        .from("subscribers")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      if (error) throw error;
      const total = 1851 + (count || 0);
      setSubscriberCount(total);
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
    }
  };

  const fetchSeoCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("seo_categories")
        .select("slug, title, order_index")
        .eq("is_active", true)
        .order("order_index");

      if (error) throw error;
      setSeoCategories(data || []);
    } catch (error) {
      console.error("Error fetching SEO categories:", error);
    }
  };

  // Animate counter smoothly
  useEffect(() => {
    if (displayCount === subscriberCount) return;
    
    const increment = subscriberCount > displayCount ? 1 : -1;
    const timer = setTimeout(() => {
      setDisplayCount((prev) => prev + increment);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [displayCount, subscriberCount]);

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

      const { error } = await supabase
        .from("subscribers")
        .insert([{ 
          email,
          status: "active"
        }]);

      if (error) throw error;

      toast({
        title: "Success! 🎉",
        description: "You've been subscribed to Rarible Nomads!",
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
    slug: article.slug,
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
        title="Rarible Nomads - Digital Nomad Relocation & International Living"
        description="Independent insights on digital nomad relocation, visa requirements, tax optimization, and international living. Join 1,800+ readers making smarter decisions."
        keywords="digital nomad relocation, visa requirements, tax optimization, remote work, international living, expat guide, nomad checklist, relocation services"
        url="https://www.rariblenomads.info"
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
          {/* Header with Navigation */}
          <header className="border-b border-border/30 bg-background sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
                    <span className="font-semibold text-foreground">Rarible Nomads</span>
                  </Link>
                  
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="h-9 text-sm">
                          Categories
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[300px] gap-2 p-4">
                            {seoCategories.map((category) => (
                              <li key={category.slug}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={`/digital-nomad-relocation/category/${category.slug}`}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{category.title}</div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                            <li className="border-t pt-2 mt-2">
                              <NavigationMenuLink asChild>
                                <Link
                                  to="/digital-nomad-relocation"
                                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                                >
                                  View All Topics →
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Main Header Section */}
          <div className="pt-6 pb-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight text-foreground">
                Rarible{" "}
                <span className="relative inline-block z-0">
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[45%] bg-orange-200/70"
                    style={{ zIndex: -1 }}
                  ></span>
                  <span className="relative z-10">Nomads</span>
                </span>
              </h1>

              <p className="text-muted-foreground mb-2">
                Independent insights on digital nomad relocation and international living.
              </p>
              <p className="text-muted-foreground mb-8">
                Join{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {displayCount.toLocaleString()}
                </span>{" "}
                readers.
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
          </div>

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
