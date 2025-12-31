import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const Disclaimer = () => {
  return (
    <>
      <SEOHead 
        title="Disclaimer | Rarible Nomads"
        description="Disclaimer for Rarible Nomads. Important information about the nature and limitations of content on this website."
        url="https://www.rariblenomads.info/disclaimer"
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">Disclaimer</h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              The information provided on Rarible Nomads is for general informational purposes only. While we strive to keep content accurate and up to date, we make no guarantees regarding completeness, accuracy, or applicability to individual situations.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-3">No Legal, Tax, or Immigration Advice</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Content on this website does not constitute:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>legal advice,</li>
                <li>tax advice,</li>
                <li>immigration or visa advice,</li>
                <li>financial or professional consulting.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Relocation laws, visa rules, and tax regulations vary by country and can change frequently. Always consult qualified professionals or official government sources before making relocation or legal decisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Use at Your Own Risk</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any action you take based on information found on Rarible Nomads is strictly at your own risk. We are not liable for losses, damages, or consequences resulting from reliance on website content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">External Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our articles may include links to third-party websites or resources. These are provided for convenience only. We do not control or endorse the content, accuracy, or policies of external sites.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">No Guarantees</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">We do not guarantee:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>visa approval,</li>
                <li>residency approval,</li>
                <li>tax outcomes,</li>
                <li>financial results,</li>
                <li>relocation success.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Each individual's circumstances are unique.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Changes to This Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                This Disclaimer may be updated at any time without prior notice. Continued use of the website implies acceptance of the current version.
              </p>
              <p className="text-foreground font-medium">Last updated: 2025</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;
