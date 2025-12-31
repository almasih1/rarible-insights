import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <>
      <SEOHead 
        title="Newsletter for Digital Nomads | Rarible Nomads"
        description="Join the Rarible Nomads newsletter for updates on digital nomad relocation guides, visa changes, and international living."
        keywords="digital nomad newsletter, relocation updates, visa news, expat newsletter"
        url="https://www.rariblenomads.info/newsletter"
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
            Newsletter for Digital Nomads
          </h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              The Rarible Nomads newsletter is a planned update channel for readers interested in digital nomad relocation, visas, taxes, and life abroad.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We share updates when new relocation guides are published, as well as important changes related to digital nomad visas and international relocation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Subscriptions are managed through the homepage. If you would like to join the newsletter, please use the subscription form on the main page.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The newsletter is optional and does not replace content published directly on the website.
            </p>

            <div className="pt-8">
              <Link to="/">
                <Button className="gap-2">
                  Subscribe on the homepage
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Newsletter;
