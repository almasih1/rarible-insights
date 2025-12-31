import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Digital Nomad Relocation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Digital Nomad Relocation</h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/digital-nomad-relocation/relocation-checklist"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Relocation Checklist
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/documents-needed"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documents for Digital Nomads
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/digital-nomad-visas"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Digital Nomad Visas (by Country)
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/relocation-timeline"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Relocation Timeline
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/relocation-cost"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cost of Relocation Abroad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Guides & Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Guides & Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/digital-nomad-relocation/country-guides"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Country Relocation Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/nomad-taxes"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Taxes for Digital Nomads
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/healthcare-insurance"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Healthcare & Insurance Abroad
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/banking-abroad"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Banking & Payments for Nomads
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation/relocation-mistakes"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Common Relocation Mistakes
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
                  Latest Relocation Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/digital-nomad-relocation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Updates & New Articles
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
