import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy | Rarible Nomads"
        description="Privacy Policy for Rarible Nomads. Learn how we collect, use, and protect your personal information."
        url="https://www.rariblenomads.info/privacy-policy"
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              At Rarible Nomads, we respect your privacy and are committed to protecting any personal information you may share with us. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your information.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">We may collect limited personal information when you:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>subscribe to our newsletter,</li>
                <li>contact us via forms or email,</li>
                <li>interact with our website analytics.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                This information may include your email address, IP address, browser type, and general usage data. We do not collect sensitive personal data such as government IDs, financial details, or immigration documents.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">How We Use Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">The information we collect is used to:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>improve website performance and content quality,</li>
                <li>respond to user inquiries,</li>
                <li>send optional updates or newsletters,</li>
                <li>analyze general traffic trends.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not sell, rent, or trade your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Cookies and Analytics</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Rarible Nomads may use cookies and third-party analytics tools (such as Google Analytics) to understand how visitors use the site. These tools collect anonymized data and help us improve user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can disable cookies through your browser settings if you prefer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites. We encourage you to review their privacy policies separately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>request access to your personal data,</li>
                <li>request correction or deletion of your data,</li>
                <li>withdraw consent for communications.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise these rights, please contact us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, you can contact us at:{" "}
                <a href="mailto:contact@rariblenomads.info" className="text-primary hover:underline">
                  contact@rariblenomads.info
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                This Privacy Policy may be updated from time to time. Any changes will be reflected on this page with an updated revision date.
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

export default PrivacyPolicy;
