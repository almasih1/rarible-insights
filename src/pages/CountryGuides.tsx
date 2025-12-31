import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const CountryGuides = () => {
  return (
    <>
      <SEOHead 
        title="Country Relocation Guides for Digital Nomads | Rarible Nomads"
        description="Country-specific relocation guides for digital nomads. Visas, taxes, healthcare, and practical living information."
        keywords="country guides, relocation guides, digital nomad countries, expat guides"
        url="https://www.rariblenomads.info/digital-nomad-relocation/country-guides"
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
            Country Relocation Guides for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Each country has its own relocation rules, visa options, and practical considerations for digital nomads. General advice is helpful, but country-specific information is essential for planning a successful move.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This section will provide individual country guides covering visas, taxes, healthcare, banking, and everyday life considerations relevant to remote workers.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> Country guides will be published and expanded over time as part of the digital nomad relocation series.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CountryGuides;
