import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const RelocationMistakes = () => {
  return (
    <>
      <SEOHead 
        title="Common Relocation Mistakes Digital Nomads Make | Rarible Nomads"
        description="Avoid common relocation mistakes. Learn from typical pitfalls digital nomads face when moving abroad."
        keywords="relocation mistakes, digital nomad mistakes, moving abroad errors, expat mistakes"
        url="https://www.rariblenomads.info/digital-nomad-relocation/relocation-mistakes"
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
            Common Relocation Mistakes Digital Nomads Make
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Many relocation problems arise not from bad luck, but from avoidable mistakes. Understanding common relocation pitfalls helps digital nomads plan more effectively.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide highlights frequent mistakes such as relying on tourist visas, underestimating timelines, ignoring tax rules, or delaying document preparation.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> A detailed list of relocation mistakes and how to avoid them will be published as this guide is expanded.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RelocationMistakes;
