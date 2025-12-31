import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const RelocationCost = () => {
  return (
    <>
      <SEOHead 
        title="Cost of Relocation Abroad for Digital Nomads | Rarible Nomads"
        description="Understand the costs of relocating abroad. Visa fees, documents, insurance, travel, and living expenses."
        keywords="relocation cost, moving abroad cost, digital nomad budget, visa fees"
        url="https://www.rariblenomads.info/digital-nomad-relocation/relocation-cost"
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
            Cost of Relocation Abroad for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              The cost of relocating abroad as a digital nomad depends on many factors, including destination, visa requirements, housing choices, and lifestyle preferences. Understanding these costs in advance helps avoid financial surprises.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide introduces the main expense categories involved in relocation, such as visa fees, document preparation, travel costs, insurance, and initial living expenses.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> A detailed cost breakdown with real-world examples and budgeting tips will be added soon.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RelocationCost;
