import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { 
  LogOut, 
  FileText, 
  Users, 
  TrendingUp, 
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Grid,
  Tag,
  Mail,
  Settings
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  status: string;
  views: number;
  created_at: string;
  seo_category?: {
    id: string;
    title: string;
    slug: string;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalViews: 0,
    subscribers: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
    fetchRecentArticles();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchStats = async () => {
    try {
      // Get total articles
      const { count: totalArticles } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true });

      // Get published articles
      const { count: publishedArticles } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      // Get total views
      const { data: viewsData } = await supabase
        .from("articles")
        .select("views");
      
      const totalViews = viewsData?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;

      // Get subscribers count
      const { count: subscribers } = await supabase
        .from("subscribers")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      setStats({
        totalArticles: totalArticles || 0,
        publishedArticles: publishedArticles || 0,
        totalViews,
        subscribers: subscribers || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          status,
          views,
          created_at,
          seo_category:seo_categories(id, title, slug)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Article deleted",
        description: "The article has been successfully deleted",
      });

      fetchRecentArticles();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const statCards = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Published",
      value: stats.publishedArticles,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "bg-purple-500",
    },
    {
      title: "Subscribers",
      value: stats.subscribers,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="sm"
              >
                View Site
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            <Button
              onClick={() => navigate("/admin/articles/new")}
              size="lg"
              className="gap-2 h-auto py-4 flex-col"
            >
              <PlusCircle className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">New Article</div>
                <div className="text-xs opacity-80">Create content</div>
              </div>
            </Button>
            
            <Button
              onClick={() => navigate("/admin/site-settings")}
              size="lg"
              variant="outline"
              className="gap-2 h-auto py-4 flex-col"
            >
              <Settings className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Site Settings</div>
                <div className="text-xs opacity-80">Homepage & Footer</div>
              </div>
            </Button>
            
            <Button
              onClick={() => navigate("/admin/ads")}
              size="lg"
              variant="outline"
              className="gap-2 h-auto py-4 flex-col"
            >
              <Grid className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Ads</div>
                <div className="text-xs opacity-80">Sidebar ads</div>
              </div>
            </Button>
            
            <Button
              onClick={() => navigate("/admin/categories")}
              size="lg"
              variant="outline"
              className="gap-2 h-auto py-4 flex-col"
            >
              <Tag className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Categories</div>
                <div className="text-xs opacity-80">Manage tags</div>
              </div>
            </Button>
            
            <Button
              onClick={() => navigate("/admin/authors")}
              size="lg"
              variant="outline"
              className="gap-2 h-auto py-4 flex-col"
            >
              <Users className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Authors</div>
                <div className="text-xs opacity-80">Manage writers</div>
              </div>
            </Button>
            
            <Button
              onClick={() => navigate("/admin/subscribers")}
              size="lg"
              variant="outline"
              className="gap-2 h-auto py-4 flex-col"
            >
              <Mail className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Subscribers</div>
                <div className="text-xs opacity-80">Email list</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Recent Articles */}
        <div className="bg-card border border-border rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Articles</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="px-6 py-12 text-center text-muted-foreground">
                Loading articles...
              </div>
            ) : articles.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground mb-4">No articles yet</p>
                <Button
                  onClick={() => navigate("/admin/articles/new")}
                  variant="outline"
                  className="gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Create your first article
                </Button>
              </div>
            ) : (
              articles.map((article) => (
                <div
                  key={article.id}
                  className="px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate mb-1">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="capitalize">{article.status}</span>
                        <span>•</span>
                        <span>{article.views} views</span>
                        <span>•</span>
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                        {article.seo_category && (
                          <>
                            <span>•</span>
                            <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                              {article.seo_category.title}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteArticle(article.id)}
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
