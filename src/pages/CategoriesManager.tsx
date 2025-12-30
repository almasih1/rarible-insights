import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

const colorOptions = [
  { value: "bg-blue-100 text-blue-700 border-blue-200", label: "Blue" },
  { value: "bg-green-100 text-green-700 border-green-200", label: "Green" },
  { value: "bg-purple-100 text-purple-700 border-purple-200", label: "Purple" },
  { value: "bg-orange-100 text-orange-700 border-orange-200", label: "Orange" },
  { value: "bg-red-100 text-red-700 border-red-200", label: "Red" },
  { value: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Yellow" },
  { value: "bg-pink-100 text-pink-700 border-pink-200", label: "Pink" },
  { value: "bg-indigo-100 text-indigo-700 border-indigo-200", label: "Indigo" },
];

const CategoriesManager = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState(colorOptions[0].value);

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
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setIcon("");
    setColor(colorOptions[0].value);
    setEditingCategory(null);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setIcon(category.icon);
      setColor(category.color);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name || !icon) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const slug = generateSlug(name);
      const categoryData = {
        name,
        slug,
        icon,
        color,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update(categoryData)
          .eq("id", editingCategory.id);

        if (error) throw error;
        toast({ title: "Success", description: "Category updated successfully" });
      } else {
        const { error } = await supabase
          .from("categories")
          .insert([categoryData]);

        if (error) throw error;
        toast({ title: "Success", description: "Category created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchCategories();
      toast({ title: "Success", description: "Category deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
              <h1 className="text-xl font-bold text-foreground">Manage Categories</h1>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digital Nomads"
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon (Emoji) *</Label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="🌍"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {colorOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setColor(opt.value)}
                          className={`px-3 py-2 rounded border-2 text-sm font-medium transition-all ${
                            color === opt.value
                              ? `${opt.value} border-current`
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    {editingCategory ? "Update" : "Create"} Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No categories yet</p>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              Create your first category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs border ${category.color}`}>
                        {category.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    onClick={() => handleOpenDialog(category)}
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(category.id)}
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoriesManager;
