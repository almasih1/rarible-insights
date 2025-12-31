import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const HealthcareInsurance = () => {
  return (
    <>
      <SEOHead 
        title="Healthcare and Insurance Abroad for Digital Nomads | Rarible Nomads"
        description="Healthcare and insurance options for digital nomads abroad. International health plans and visa requirements."
        keywords="digital nomad insurance, expat healthcare, international health insurance, travel insurance"
        url="https://www.rariblenomads.info/digital-nomad-relocation/healthcare-insurance"
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
            Healthcare and Insurance Abroad for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Access to healthcare is an important consideration when relocating abroad. Digital nomads often rely on private insurance or international health plans rather than local public systems.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide introduces the key differences between public and private healthcare systems, international insurance options, and typical visa-related insurance requirements.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> Expanded guidance on choosing health insurance abroad will be published soon.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HealthcareInsurance;
