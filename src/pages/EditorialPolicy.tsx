import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const EditorialPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Editorial Policy | Rarible Nomads"
        description="Learn about our editorial standards, content creation process, and commitment to accuracy at Rarible Nomads."
        url="https://www.rariblenomads.info/editorial-policy"
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
            <h1>Editorial Policy</h1>
            
            <p>This Editorial Policy explains how content on Rarible Nomads is created, reviewed, and maintained.</p>
            <p>Our objective is to provide accurate, helpful, and easy-to-understand information for digital nomads interested in relocation and life abroad.</p>

            <h2>Content Creation</h2>
            <p>All content published on Rarible Nomads is:</p>
            <ul>
              <li>written by humans,</li>
              <li>researched using publicly available and reputable sources,</li>
              <li>reviewed for clarity and factual consistency before publication.</li>
            </ul>
            <p>We aim to explain complex topics in a clear, structured, and practical way.</p>

            <h2>Sources & Accuracy</h2>
            <p>We rely on:</p>
            <ul>
              <li>official government websites,</li>
              <li>immigration authority publications,</li>
              <li>tax authority guidelines,</li>
              <li>reputable international organizations,</li>
              <li>publicly available legal and policy documents.</li>
            </ul>
            <p>Because laws and regulations change, we cannot guarantee that information remains accurate indefinitely. Content is updated periodically when relevant changes are identified.</p>

            <h2>Independence & Objectivity</h2>
            <p>Rarible Nomads maintains editorial independence.</p>
            <ul>
              <li>We do not accept paid placements that influence editorial conclusions.</li>
              <li>Sponsored content, if introduced in the future, will be clearly labeled.</li>
              <li>Opinions expressed are informational and not promotional.</li>
            </ul>

            <h2>No Professional Advice</h2>
            <p>Content on this website does not constitute:</p>
            <ul>
              <li>legal advice,</li>
              <li>immigration advice,</li>
              <li>tax advice,</li>
              <li>financial advice.</li>
            </ul>
            <p>Readers are encouraged to verify information and consult qualified professionals before making decisions.</p>

            <h2>Corrections & Updates</h2>
            <p>If errors or outdated information are identified, we aim to correct them promptly.</p>
            <p>If you believe content is inaccurate, you may contact us with supporting sources.</p>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EditorialPolicy;
