import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const Contact = () => {
  return (
    <>
      <SEOHead 
        title="Contact | Rarible Nomads"
        description="Get in touch with Rarible Nomads. Contact us for feedback, questions, or editorial inquiries."
        url="https://www.rariblenomads.info/contact"
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
            <h1>Contact Rarible Nomads</h1>
            
            <p>If you have questions, feedback, or suggestions related to content on Rarible Nomads, feel free to reach out.</p>

            <h2>How to Contact Us</h2>
            <p>You can contact us by email: <a href="mailto:contact@rariblenomads.info">contact@rariblenomads.info</a></p>
            <p>We read all messages but may not be able to respond individually to every inquiry.</p>

            <h2>What We Can Help With</h2>
            <p>You may contact us regarding:</p>
            <ul>
              <li>feedback on articles or guides,</li>
              <li>factual corrections or updates,</li>
              <li>general questions about site content,</li>
              <li>editorial or collaboration inquiries.</li>
            </ul>

            <h2>What We Cannot Provide</h2>
            <p>Please note that we do not provide:</p>
            <ul>
              <li>personal relocation advice,</li>
              <li>visa or immigration consulting,</li>
              <li>tax or legal consulting,</li>
              <li>case-by-case relocation assessments.</li>
            </ul>
            <p>For those matters, consult licensed professionals or official authorities.</p>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
