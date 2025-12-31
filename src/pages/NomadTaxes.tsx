import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const NomadTaxes = () => {
  return (
    <>
      <SEOHead 
        title="Taxes for Digital Nomads | Rarible Nomads"
        description="Understanding tax obligations for digital nomads. Tax residency, double taxation, and reporting requirements."
        keywords="digital nomad taxes, tax residency, expat taxes, remote work taxes"
        url="https://www.rariblenomads.info/digital-nomad-relocation/nomad-taxes"
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
            Taxes for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Tax obligations are one of the most complex aspects of digital nomad life. Depending on residency status, income sources, and time spent in each country, tax responsibilities can vary significantly.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide explains the basic tax concepts digital nomads should be aware of, including tax residency, double taxation, and common reporting considerations.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> A more detailed explanation with examples and practical guidance will be added to this page.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NomadTaxes;
