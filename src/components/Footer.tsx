import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SeoCategory {
  slug: string;
  title: string;
  order_index: number;
}

const Footer = () => {
  const [seoCategories, setSeoCategories] = useState<SeoCategory[]>([]);

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
    }
  };

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - SEO Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {seoCategories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link 
                    to={`/digital-nomad-relocation/category/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - More Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">More Topics</h3>
            <ul className="space-y-2.5">
              {seoCategories.slice(4).map((category) => (
                <li key={category.slug}>
                  <Link 
                    to={`/digital-nomad-relocation/category/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/digital-nomad-relocation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Topics →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - About Rarible Nomads */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About Rarible Nomads</h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/editorial-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Stay Updated */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/newsletter"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Newsletter for Digital Nomads
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Latest Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Rarible Nomads is an independent information platform with guides, checklists, and insights 
            to help digital nomads understand relocation, visas, taxes, and life abroad.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 Rarible Nomads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
