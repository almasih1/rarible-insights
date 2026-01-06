import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterContent {
  columns: FooterColumn[];
  copyright: string;
}

const Footer = () => {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    columns: [
      {
        title: "Content",
        links: [
          { text: "Digital Nomad Relocation", url: "/digital-nomad-relocation" },
          { text: "Newsletter", url: "/newsletter" },
        ],
      },
      {
        title: "About",
        links: [
          { text: "About Rarible Nomads", url: "/about" },
          { text: "Contact", url: "/contact" },
          { text: "Editorial Policy", url: "/editorial-policy" },
        ],
      },
      {
        title: "Legal",
        links: [
          { text: "Privacy Policy", url: "/privacy-policy" },
          { text: "Disclaimer", url: "/disclaimer" },
        ],
      },
    ],
    copyright: "© 2026 Rarible Nomads. All rights reserved.",
  });

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "footer_content")
        .single();

      if (error) throw error;
      if (data) setFooterContent(data.value as FooterContent);
    } catch (error) {
      console.error("Error fetching footer content:", error);
      // Use default content if fetch fails
    }
  };

  return (
    <footer className="border-t border-border/30 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {footerContent.columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
