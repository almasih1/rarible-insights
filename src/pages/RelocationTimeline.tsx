import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const RelocationTimeline = () => {
  return (
    <>
      <SEOHead 
        title="Digital Nomad Relocation Timeline | Rarible Nomads"
        description="Understand the typical timeline for relocating abroad as a digital nomad. Planning phases from research to arrival."
        keywords="relocation timeline, moving timeline, digital nomad planning, visa timeline"
        url="https://www.rariblenomads.info/digital-nomad-relocation/relocation-timeline"
      />
      
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold text-foreground">rarible insights</span>
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
            Digital Nomad Relocation Timeline
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Relocating abroad is not a single event but a process that unfolds over weeks or months. Understanding the typical relocation timeline helps digital nomads avoid delays and last-minute issues.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This page outlines the general phases of relocation, including early research, document preparation, visa application, travel planning, and post-arrival registration. Timelines vary depending on destination and visa type.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> A more detailed relocation timeline with recommended planning windows will be added to this guide.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RelocationTimeline;
