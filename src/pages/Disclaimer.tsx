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

        <main className="max-w-4xl mx-auto px-4 py-12">
          <article className="prose prose-neutral max-w-none">
            <h1>Disclaimer</h1>
            
            <p>The information provided on Rarible Nomads is for general informational purposes only. While we strive to keep content accurate and up to date, we make no guarantees regarding completeness, accuracy, or applicability to individual situations.</p>

            <h2>No Legal, Tax, or Immigration Advice</h2>
            <p>Content on this website does not constitute:</p>
            <ul>
              <li>legal advice,</li>
              <li>tax advice,</li>
              <li>immigration or visa advice,</li>
              <li>financial or professional consulting.</li>
            </ul>
            <p>Relocation laws, visa rules, and tax regulations vary by country and can change frequently. Always consult qualified professionals or official government sources before making relocation or legal decisions.</p>

            <h2>Use at Your Own Risk</h2>
            <p>Any action you take based on information found on Rarible Nomads is strictly at your own risk. We are not liable for losses, damages, or consequences resulting from reliance on website content.</p>

            <h2>External Links</h2>
            <p>Our articles may include links to third-party websites or resources. These are provided for convenience only. We do not control or endorse the content, accuracy, or policies of external sites.</p>

            <h2>No Guarantees</h2>
            <p>We do not guarantee:</p>
            <ul>
              <li>visa approval,</li>
              <li>residency approval,</li>
              <li>tax outcomes,</li>
              <li>financial results,</li>
              <li>relocation success.</li>
            </ul>
            <p>Each individual's circumstances are unique.</p>

            <h2>Changes to This Disclaimer</h2>
            <p>This Disclaimer may be updated at any time without prior notice. Continued use of the website implies acceptance of the current version.</p>
            <p><strong>Last updated: 2025</strong></p>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;
