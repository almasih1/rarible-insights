import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { ArrowLeft, Download, Trash2, Search } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  status: string;
  created_at: string;
}

const SubscribersManager = () => {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkAuth();
    fetchSubscribers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredSubscribers(
        subscribers.filter((sub) =>
          sub.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredSubscribers(subscribers);
    }
  }, [searchQuery, subscribers]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
      setFilteredSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete ${email}?`)) return;

    try {
      const { error } = await supabase
        .from("subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchSubscribers();
      toast({ title: "Success", description: "Subscriber deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ["Email", "Status", "Subscribed Date"],
      ...filteredSubscribers.map((sub) => [
        sub.email,
        sub.status,
        new Date(sub.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const unsubscribedCount = subscribers.filter((s) => s.status === "unsubscribed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/admin/dashboard")}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <h1 className="text-xl font-bold text-foreground">Subscribers</h1>
            </div>
            <Button onClick={handleExportCSV} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-2xl font-bold text-foreground">{subscribers.length}</h3>
            <p className="text-sm text-muted-foreground">Total Subscribers</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-600">{activeCount}</h3>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-600">{unsubscribedCount}</h3>
            <p className="text-sm text-muted-foreground">Unsubscribed</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Subscribers List */}
        <div className="bg-card border border-border rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              All Subscribers ({filteredSubscribers.length})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="px-6 py-12 text-center text-muted-foreground">
                Loading subscribers...
              </div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground">
                  {searchQuery ? "No subscribers found" : "No subscribers yet"}
                </p>
              </div>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-foreground">
                          {subscriber.email}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            subscriber.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subscriber.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Subscribed on {new Date(subscriber.created_at).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDelete(subscriber.id, subscriber.email)}
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
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

export default SubscribersManager;
