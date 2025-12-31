import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const BankingAbroad = () => {
  return (
    <>
      <SEOHead 
        title="Banking and Payments for Digital Nomads | Rarible Nomads"
        description="Banking solutions for digital nomads abroad. International accounts, multi-currency, and payment methods."
        keywords="digital nomad banking, international banking, multi-currency account, expat banking"
        url="https://www.rariblenomads.info/digital-nomad-relocation/banking-abroad"
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
            Banking and Payments for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Managing finances across borders requires careful planning. Digital nomads often need international banking solutions, multi-currency accounts, and reliable payment methods.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This guide covers the basics of banking abroad, including opening accounts, managing currencies, and handling international payments.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming Soon:</strong> A more detailed overview of banking options and financial tools will be added shortly.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BankingAbroad;
