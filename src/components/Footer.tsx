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
  description: string;
}

const Footer = () => {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    columns: [
      {
        title: "Digital Nomad Relocation",
        links: [
          { text: "Relocation Checklist", url: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
          { text: "Documents for Digital Nomads", url: "/digital-nomad-relocation/documents-needed" },
          { text: "Digital Nomad Visas (by Country)", url: "/digital-nomad-relocation/digital-nomad-visas" },
          { text: "Relocation Timeline", url: "/digital-nomad-relocation/relocation-timeline" },
          { text: "Cost of Relocation Abroad", url: "/digital-nomad-relocation/relocation-cost" },
        ],
      },
      {
        title: "Guides & Resources",
        links: [
          { text: "Country Relocation Guides", url: "/digital-nomad-relocation/country-guides" },
          { text: "Taxes for Digital Nomads", url: "/digital-nomad-relocation/nomad-taxes" },
          { text: "Healthcare & Insurance Abroad", url: "/digital-nomad-relocation/healthcare-insurance" },
          { text: "Banking & Payments for Nomads", url: "/digital-nomad-relocation/banking-abroad" },
          { text: "Common Relocation Mistakes", url: "/digital-nomad-relocation/relocation-mistakes" },
        ],
      },
      {
        title: "About Rarible Nomads",
        links: [
          { text: "About Us", url: "/about" },
          { text: "Editorial Policy", url: "/editorial-policy" },
          { text: "Contact", url: "/contact" },
          { text: "Privacy Policy", url: "/privacy-policy" },
          { text: "Disclaimer", url: "/disclaimer" },
        ],
      },
      {
        title: "Stay Updated",
        links: [
          { text: "Newsletter for Digital Nomads", url: "/newsletter" },
          { text: "Latest Relocation Guides", url: "/digital-nomad-relocation" },
          { text: "Updates & New Articles", url: "/digital-nomad-relocation" },
        ],
      },
    ],
    description: "Rarible Nomads is an independent information platform with guides, checklists, and insights to help digital nomads understand relocation, visas, taxes, and life abroad.",
    copyright: "© 2025 Rarible Nomads. All rights reserved.",
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
    }
  };

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerContent.columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
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

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            {footerContent.description}
          </p>
          <p className="text-sm text-muted-foreground">
            {footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
