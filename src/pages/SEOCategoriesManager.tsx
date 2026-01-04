import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react";

interface SEOCategory {
  id: string;
  slug: string;
  title: string;
  h1_text: string;
  intro_text: string;
  key_topics: string[];
  order_index: number;
  is_active: boolean;
}

const SEOCategoriesManager = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<SEOCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<SEOCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("seo_categories")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching SEO categories:", error);
      toast({
        title: "Error",
        description: "Failed to load SEO categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: SEOCategory) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingCategory) return;

    try {
      const { error } = await supabase
        .from("seo_categories")
        .update({
          title: editingCategory.title,
          h1_text: editingCategory.h1_text,
          intro_text: editingCategory.intro_text,
          is_active: editingCategory.is_active,
        })
        .eq("id", editingCategory.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "SEO category updated successfully",
      });

      setIsDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (category: SEOCategory) => {
    try {
      const { error } = await supabase
        .from("seo_categories")
        .update({ is_active: !category.is_active })
        .eq("id", category.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Category ${!category.is_active ? "activated" : "deactivated"}`,
      });

      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading SEO categories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              <h1 className="text-lg font-semibold text-foreground">
                Manage SEO Categories
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            These are the 7 SEO categories for digital nomad content. They cannot be deleted, only edited.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className={!category.is_active ? "opacity-50" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    /{category.slug}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {category.key_topics.slice(0, 2).join(", ")}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleEdit(category)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleToggleActive(category)}
                    variant={category.is_active ? "destructive" : "default"}
                    size="sm"
                    className="flex-1"
                  >
                    {category.is_active ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit SEO Category</DialogTitle>
            <DialogDescription>
              Update the category details. Slug and key topics cannot be changed.
            </DialogDescription>
          </DialogHeader>

          {editingCategory && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Category Title</Label>
                <Input
                  id="title"
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, title: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="h1">H1 Text (Page Heading)</Label>
                <Input
                  id="h1"
                  value={editingCategory.h1_text}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, h1_text: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="intro">Intro Text (SEO Description)</Label>
                <Textarea
                  id="intro"
                  value={editingCategory.intro_text}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, intro_text: e.target.value })
                  }
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Slug:</strong> {editingCategory.slug} (read-only)
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Key Topics:</strong> {editingCategory.key_topics.join(", ")} (read-only)
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOCategoriesManager;
