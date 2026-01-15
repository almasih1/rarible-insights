import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  label?: string;
  links: FooterLink[];
}

interface FooterColumn {
  title: string;
  sections?: FooterSection[];
  links?: FooterLink[];
}

interface FooterContent {
  columns: FooterColumn[];
  copyright: string;
  description: string;
}

// Default fallback content - MOVED OUTSIDE COMPONENT
const defaultFooterContent: FooterContent = {
  columns: [
    {
      title: "Content",
      sections: [
        {
          label: "Relocation Hub",
          links: [
            { text: "Digital Nomad Relocation", url: "https://www.rariblenomads.info/digital-nomad-relocation" },
            { text: "Newsletter", url: "/newsletter" },
          ],
        },
        {
          label: "Latest Guides",
          links: [
            { text: "Relocation Checklist (Quick)", url: "https://www.rariblenomads.info/digital-nomad-relocation/relocation-checklist-digital-nomads" },
            { text: "Relocation Checklist (Full)", url: "https://www.rariblenomads.info/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
            { text: "Documents Needed (Quick)", url: "https://www.rariblenomads.info/digital-nomad-relocation/documents-needed" },
            { text: "Documents Needed (Full guide)", url: "https://www.rariblenomads.info/digital-nomad-relocation/documents-needed-for-digital-nomads" },
            { text: "Tax Residency", url: "https://www.rariblenomads.info/digital-nomad-relocation/tax-residency-for-digital-nomads" },
            { text: "Banking Abroad", url: "https://www.rariblenomads.info/digital-nomad-relocation/banking-abroad-for-digital-nomads" },
          ],
        },
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
    {
      title: "Topics",
      links: [
        { text: "Visas & Residency", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/visas-residency" },
        { text: "Taxes & Legal", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/taxes-legal" },
        { text: "Banking & Finance", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/banking-finance" },
        { text: "Healthcare & Insurance", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/healthcare-insurance" },
        { text: "Cost of Living & Housing", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/cost-living-housing" },
        { text: "Remote Work & Income", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/remote-work-income" },
        { text: "Safety & Infrastructure", url: "https://www.rariblenomads.info/digital-nomad-relocation/category/safety-infrastructure" },
      ],
    },
  ],
  description: "Rarible Nomads is an independent information platform with guides, checklists, and insights to help digital nomads understand relocation, visas, taxes, and life abroad.",
  copyright: "© 2025 Rarible Nomads. All rights reserved.",
};

const Footer = () => {
  const [footerContent] = useState<FooterContent>(defaultFooterContent);

  // Always use hardcoded content - no Supabase fetch
  useEffect(() => {
    console.log("🚀 Footer loaded with hardcoded 4-column structure");
  }, []);

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerContent.columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
              
              {/* If column has sections (like Content column) */}
              {column.sections && (
                <div className="space-y-6">
                  {column.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {section.label && (
                        <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-2 font-medium">
                          {section.label}
                        </p>
                      )}
                      <ul className="space-y-2.5">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {link.url.startsWith('http') ? (
                              <a
                                href={link.url}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {link.text}
                              </a>
                            ) : (
                              <Link
                                to={link.url}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {link.text}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* If column has simple links (like About, Legal, Topics) */}
              {column.links && (
                <ul className="space-y-2.5">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.url.startsWith('http') ? (
                        <a
                          href={link.url}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link
                          to={link.url}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.text}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
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