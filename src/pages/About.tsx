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

        <main className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">About Rarible Nomads</h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Rarible Nomads is an independent information platform created to help digital nomads, remote workers, and location-independent professionals better understand international relocation.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              We publish practical guides, checklists, and research-based articles covering topics such as relocation planning, digital nomad visas, taxes, healthcare, banking, and life abroad. Our goal is to make complex relocation topics clearer and more accessible.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Why We Exist</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Relocating to another country often involves confusing rules, changing regulations, and fragmented information. Many resources focus on selling services rather than explaining the process clearly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Rarible Nomads exists to provide neutral, educational content that helps readers:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>understand relocation requirements,</li>
                <li>prepare documents correctly,</li>
                <li>avoid common mistakes,</li>
                <li>make informed decisions before moving abroad.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Approach</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">We focus on:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>clarity over hype,</li>
                <li>practical explanations over marketing language,</li>
                <li>independent research over sponsored opinions.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Content is created using publicly available sources, official government information, and real-world relocation scenarios commonly faced by digital nomads.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Independence & Transparency</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Rarible Nomads is an independent project. We do not represent governments, immigration authorities, or relocation agencies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Some articles may reference third-party services or tools for informational purposes only. Any potential partnerships or affiliations will always be disclosed transparently.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Important Note</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Rarible Nomads provides informational content only. We do not offer legal, tax, immigration, or financial advice.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For official guidance, always consult qualified professionals or government sources.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
