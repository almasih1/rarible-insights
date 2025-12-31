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

        <main className="max-w-4xl mx-auto px-4 py-12">
          <article className="prose prose-neutral max-w-none">
            <h1>Privacy Policy</h1>
            
            <p>At Rarible Nomads, we respect your privacy and are committed to protecting any personal information you may share with us. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your information.</p>

            <h2>Information We Collect</h2>
            <p>We may collect limited personal information when you:</p>
            <ul>
              <li>subscribe to our newsletter,</li>
              <li>contact us via forms or email,</li>
              <li>interact with our website analytics.</li>
            </ul>
            <p>This information may include your email address, IP address, browser type, and general usage data. We do not collect sensitive personal data such as government IDs, financial details, or immigration documents.</p>

            <h2>How We Use Information</h2>
            <p>The information we collect is used to:</p>
            <ul>
              <li>improve website performance and content quality,</li>
              <li>respond to user inquiries,</li>
              <li>send optional updates or newsletters,</li>
              <li>analyze general traffic trends.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to third parties.</p>

            <h2>Cookies and Analytics</h2>
            <p>Rarible Nomads may use cookies and third-party analytics tools (such as Google Analytics) to understand how visitors use the site. These tools collect anonymized data and help us improve user experience.</p>
            <p>You can disable cookies through your browser settings if you prefer.</p>

            <h2>Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites. We encourage you to review their privacy policies separately.</p>

            <h2>Data Security</h2>
            <p>We take reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>request access to your personal data,</li>
              <li>request correction or deletion of your data,</li>
              <li>withdraw consent for communications.</li>
            </ul>
            <p>To exercise these rights, please contact us.</p>

            <h2>Contact Information</h2>
            <p>If you have questions about this Privacy Policy, you can contact us at: <a href="mailto:contact@rariblenomads.info">contact@rariblenomads.info</a></p>

            <h2>Updates to This Policy</h2>
            <p>This Privacy Policy may be updated from time to time. Any changes will be reflected on this page with an updated revision date.</p>
            <p><strong>Last updated: 2025</strong></p>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
