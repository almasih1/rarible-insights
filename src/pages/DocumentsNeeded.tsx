import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const DocumentsNeeded = () => {
  return (
    <>
      <SEOHead 
        title="Documents Needed for Digital Nomad Relocation | Rarible Nomads"
        description="Essential documents required for digital nomad relocation. Passports, visas, proof of income, insurance, and more."
        keywords="digital nomad documents, relocation documents, visa documents, expat paperwork"
        url="https://www.rariblenomads.info/digital-nomad-relocation/documents-needed"
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
            Documents Needed for Digital Nomad Relocation
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Proper documentation is a critical part of relocating abroad as a digital nomad. Different countries require different paperwork, but there are several documents commonly requested during relocation and visa applications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide focuses on core document categories such as passports, proof of income, health insurance certificates, background checks, translations, and apostilles. It aims to help digital nomads understand what types of documents are typically needed and why they matter.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> A detailed breakdown of required documents, preparation timelines, and common mistakes will be added to this page shortly.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DocumentsNeeded;
