import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const DigitalNomadVisas = () => {
  return (
    <>
      <SEOHead 
        title="Digital Nomad Visas by Country | Rarible Nomads"
        description="Comprehensive guide to digital nomad visas worldwide. Compare requirements, costs, and eligibility by country."
        keywords="digital nomad visa, remote work visa, nomad visa by country, visa comparison"
        url="https://www.rariblenomads.info/digital-nomad-relocation/digital-nomad-visas"
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
            Digital Nomad Visas by Country
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Many countries now offer specific visa options for digital nomads and remote workers. These visas allow individuals to live abroad legally while working for foreign employers or clients.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide provides an overview of how digital nomad visas work, what eligibility criteria typically look like, and how requirements differ by country. It also explains common conditions such as income thresholds, duration limits, and renewal rules.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> Country-by-country visa summaries and comparisons will be added to this page as the guide is expanded.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DigitalNomadVisas;
