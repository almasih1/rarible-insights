import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const RelocationChecklist = () => {
  return (
    <>
      <SEOHead 
        title="Relocation Checklist for Digital Nomads | Rarible Nomads"
        description="Complete relocation checklist for digital nomads moving abroad. Essential steps, documents, and planning tips."
        keywords="relocation checklist, digital nomad, moving abroad, expat checklist"
        url="https://www.rariblenomads.info/digital-nomad-relocation/relocation-checklist"
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
            Relocation Checklist for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Relocating to another country as a digital nomad involves many steps, decisions, and deadlines. This relocation checklist is designed to help remote workers understand the full process before, during, and after an international move.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The checklist covers essential preparation stages such as choosing a destination, understanding visa requirements, preparing documents, arranging healthcare and insurance, and planning finances. It is intended as a structured overview rather than a country-specific guide.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> This page will be expanded with a detailed, step-by-step relocation checklist tailored specifically for digital nomads and remote professionals moving abroad.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RelocationChecklist;
