import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface SeoCategory {
  slug: string;
  title: string;
  order_index: number;
}

interface CategoryTagsProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

const CategoryTags = ({ selectedCategory, onCategoryClick }: CategoryTagsProps) => {
  const [seoCategories, setSeoCategories] = useState<SeoCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeoCategories();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 px-4 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (seoCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Browse other categories</h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {seoCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/digital-nomad-relocation/category/${category.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 hover:border-border hover:shadow-sm transition-all text-sm font-medium text-foreground"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTags;
