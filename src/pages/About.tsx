import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const About = () => {
  return (
    <>
      <SEOHead 
        title="About Rarible Nomads | Digital Nomad Relocation Guides"
        description="Learn about Rarible Nomads, an independent platform providing practical guides for digital nomads planning international relocation."
        url="https://www.rariblenomads.info/about"
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
            <h1>About Rarible Nomads</h1>
            
            <p>Rarible Nomads is an independent information platform created to help digital nomads, remote workers, and location-independent professionals better understand international relocation.</p>
            
            <p>We publish practical guides, checklists, and research-based articles covering topics such as relocation planning, digital nomad visas, taxes, healthcare, banking, and life abroad. Our goal is to make complex relocation topics clearer and more accessible.</p>

            <h2>Why We Exist</h2>
            <p>Relocating to another country often involves confusing rules, changing regulations, and fragmented information. Many resources focus on selling services rather than explaining the process clearly.</p>
            
            <p>Rarible Nomads exists to provide neutral, educational content that helps readers:</p>
            <ul>
              <li>understand relocation requirements,</li>
              <li>prepare documents correctly,</li>
              <li>avoid common mistakes,</li>
              <li>make informed decisions before moving abroad.</li>
            </ul>

            <h2>Our Approach</h2>
            <p>We focus on:</p>
            <ul>
              <li>clarity over hype,</li>
              <li>practical explanations over marketing language,</li>
              <li>independent research over sponsored opinions.</li>
            </ul>
            <p>Content is created using publicly available sources, official government information, and real-world relocation scenarios commonly faced by digital nomads.</p>

            <h2>Independence & Transparency</h2>
            <p>Rarible Nomads is an independent project. We do not represent governments, immigration authorities, or relocation agencies.</p>
            <p>Some articles may reference third-party services or tools for informational purposes only. Any potential partnerships or affiliations will always be disclosed transparently.</p>

            <h2>Important Note</h2>
            <p>Rarible Nomads provides informational content only. We do not offer legal, tax, immigration, or financial advice.</p>
            <p>For official guidance, always consult qualified professionals or government sources.</p>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
