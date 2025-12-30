const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="font-serif text-base font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Search</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Stats</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Olympics</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Recently Added</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Top 100 Startups</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Buy/Sell Startups</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">$1 vs $1,000,000 Startup</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Open Revenue</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of service</a></li>
            </ul>
          </div>

          {/* Browse startups */}
          <div>
            <h3 className="font-serif text-base font-medium mb-4">Browse startups</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Artificial Intelligence</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">SaaS</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Developer Tools</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Fintech</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Marketing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">E-commerce</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Productivity</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Design Tools</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">No-Code</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* From the maker */}
          <div>
            <h3 className="font-serif text-base font-medium mb-4">From the maker of TrustMRR</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Newsletter for entrepreneurs</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">CodeFast</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">ShipFast</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">DataFast</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">ByeDispute</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">IndiePage</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">ZenVoice</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GamifyList</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">WorkbookPDF</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">HabitsGarden</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
