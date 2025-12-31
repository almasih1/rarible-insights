import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";
import logo from "@/assets/logo.png";
import { Share2, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RelocationChecklist = () => {
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Relocation Checklist for Digital Nomads",
        url: url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Article link copied to clipboard",
        });
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
      });
    }
  };

  const canonicalUrl = "https://www.rariblenomads.info/digital-nomad-relocation/relocation-checklist-digital-nomads";

  return (
    <>
      <SEOHead 
        title="Relocation Checklist for Digital Nomads | Rarible Nomads"
        description="Complete guide to digital nomad relocation. Learn the six key stages, required documents, costs, and common mistakes to avoid when relocating abroad."
        keywords="digital nomad relocation, visa requirements, tax optimization, remote work, international living, expat guide, nomad checklist"
        url={canonicalUrl}
        article={true}
        author="Almasih"
        publishedTime="2025-12-31T00:00:00Z"
        category="Digital Nomads"
      />
      
      <ArticleSchema 
        title="Relocation Checklist for Digital Nomads"
        description="Complete guide to digital nomad relocation covering planning, documents, finances, healthcare, and compliance."
        image="https://www.rariblenomads.info/og-image.jpg"
        author="Almasih"
        publishedTime="2025-12-31T00:00:00Z"
        modifiedTime="2025-12-31T00:00:00Z"
        category="Digital Nomads"
        url={canonicalUrl}
      />
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.rariblenomads.info" },
          { name: "Digital Nomad Relocation", url: "https://www.rariblenomads.info/digital-nomad-relocation" },
          { name: "Relocation Checklist for Digital Nomads", url: canonicalUrl }
        ]}
      />
      
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-foreground">Rarible Nomads</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/digital-nomad-relocation">Digital Nomad Relocation</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Relocation Checklist for Digital Nomads</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 pb-16">
        <article className="relative">
          {/* Share Button */}
          <div className="absolute -right-16 top-0 hidden lg:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full hover:bg-muted"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl mb-6">
            🗺️
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Relocation Checklist for Digital Nomads
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground">Dec 31, 2025</span>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>6 min read</span>
            </div>
            <span className="text-muted-foreground">·</span>
            <Badge variant="outline" className="text-xs px-2 py-0.5 rounded font-medium bg-green-50 text-green-700 border-green-200">
              Digital Nomads
            </Badge>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Almasih</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full hover:bg-muted lg:hidden"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Summary */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-3">In This Article:</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                <span>Relocation for digital nomads goes far beyond long-term travel.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                <span>The article explains the six key stages of digital nomad relocation and why they matter.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                <span>You'll learn what documents, costs, and insurance are usually required.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                <span>A fillable PDF checklist supports practical planning.</span>
              </li>
            </ul>
          </div>

          {/* Article Body */}
          <div className="article-content">
            <p>Relocation as a digital nomad is often misunderstood. Many people treat it like extended travel, but in reality, relocating abroad is a structured process involving visas, documents, taxes, healthcare, and compliance with local rules.</p>

            <p>This guide explains how relocation actually works for digital nomads, what stages it includes, and where most people make costly mistakes. Instead of a simple checklist, you'll find explanations, comparisons, and practical context — so you understand <em>why</em> each step matters, not just what to do.</p>

            <p>If you're looking for a printable, step-by-step checklist, you can download the fillable PDF version at the end of this article.</p>

            <h2>What "Relocation" Actually Means for Digital Nomads</h2>

            <p>Relocation is not the same as slow travel.</p>

            <p>When you relocate, you are:</p>

            <ul>
                <li>staying in a country longer than a typical tourist,</li>
                <li>interacting with immigration and tax systems,</li>
                <li>often required to register locally,</li>
                <li>subject to residency and compliance rules.</li>
            </ul>

            <p>Many problems digital nomads face — visa overstays, tax confusion, frozen bank accounts — happen because people underestimate this difference. Understanding relocation as a process rather than a trip is the foundation of doing it legally and sustainably.</p>

            <h2>The Six Stages of Digital Nomad Relocation</h2>

            <p>Most relocations follow the same structure, regardless of destination. The table below outlines the main stages and why each one matters.</p>

            <table>
                <thead>
                    <tr>
                        <th>Stage</th>
                        <th>What It Includes</th>
                        <th>Why It Matters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Planning</td>
                        <td>Country choice, visa research, tax intent</td>
                        <td>Prevents illegal stays and surprises</td>
                    </tr>
                    <tr>
                        <td>Documents</td>
                        <td>Passport, income proof, insurance</td>
                        <td>Required for visas and registration</td>
                    </tr>
                    <tr>
                        <td>Finances</td>
                        <td>Banking, buffers, payments</td>
                        <td>Avoids blocked cards and cash issues</td>
                    </tr>
                    <tr>
                        <td>Healthcare</td>
                        <td>Insurance, coverage rules</td>
                        <td>Often mandatory for visas</td>
                    </tr>
                    <tr>
                        <td>Logistics</td>
                        <td>Housing, connectivity, access</td>
                        <td>Determines first-month stability</td>
                    </tr>
                    <tr>
                        <td>Compliance</td>
                        <td>Registration, tracking days</td>
                        <td>Prevents fines and permit issues</td>
                    </tr>
                </tbody>
            </table>

            <p>Skipping or rushing any of these stages usually leads to delays or legal risks later.</p>

            <h2>Pre-Relocation Decisions That Matter Most</h2>

            <p>Before preparing documents or booking flights, digital nomads need to make several high-impact decisions.</p>

            <p>The most important one is <strong>duration</strong>. Staying for a few months versus a year or more changes everything: visa options, tax exposure, and registration requirements. Another critical decision is whether you intend to establish tax residency or remain mobile. Many people say they'll "figure it out later," but tax rules are often triggered automatically by time spent in a country.</p>

            <p>Clear intent at this stage helps you choose the right visa path and avoid accidental non-compliance.</p>

            <div className="highlight">
                <p><strong>Why "I'll decide later" is dangerous:</strong> Tax residency can be triggered automatically after 183 days in many countries. By the time you "decide," you may already have tax obligations you weren't prepared for.</p>
            </div>

            <h2>Documents: What You'll Actually Be Asked For</h2>

            <p>While document requirements vary by country, most digital nomads encounter the same core categories.</p>

            <table className="docs-table">
                <thead>
                    <tr>
                        <th>Document Type</th>
                        <th>Typical Requirement</th>
                        <th>When It's Needed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Passport</td>
                        <td>6–12 months validity</td>
                        <td>Visa & border control</td>
                    </tr>
                    <tr>
                        <td>Proof of income</td>
                        <td>Contracts or statements</td>
                        <td>Visa applications</td>
                    </tr>
                    <tr>
                        <td>Health insurance</td>
                        <td>Long-term coverage</td>
                        <td>Visa & residence permits</td>
                    </tr>
                    <tr>
                        <td>Background check</td>
                        <td>Sometimes apostilled</td>
                        <td>Certain visa types</td>
                    </tr>
                </tbody>
            </table>

            <p>Document preparation often takes longer than expected, especially when translations or apostilles are involved. Starting early reduces stress and avoids missed deadlines.</p>

            <h2>Cost of Relocation: Realistic Ranges</h2>

            <p>Relocation costs are rarely just about flights. Many first-time nomads underestimate upfront expenses.</p>

            <table className="cost-table">
                <thead>
                    <tr>
                        <th>Expense Category</th>
                        <th>Typical Range (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Visa & application fees</td>
                        <td>100–1,500</td>
                    </tr>
                    <tr>
                        <td>Documents & translations</td>
                        <td>50–400</td>
                    </tr>
                    <tr>
                        <td>Health insurance</td>
                        <td>50–250 per month</td>
                    </tr>
                    <tr>
                        <td>Initial housing</td>
                        <td>1–2 months of rent</td>
                    </tr>
                </tbody>
            </table>

            <p>These are not exact figures, but they provide a realistic planning range. Having a financial buffer makes the relocation process far more resilient.</p>

            <h2>Healthcare and Insurance Explained Simply</h2>

            <p>Travel insurance and health insurance are not the same. Travel insurance is designed for short stays and emergencies, while most relocation visas require long-term health coverage.</p>

            <p>Many applications are rejected because the insurance policy:</p>

            <ul>
                <li>doesn't cover the full visa duration,</li>
                <li>excludes certain treatments,</li>
                <li>or is explicitly labeled as "travel insurance."</li>
            </ul>

            <p>Understanding this difference early prevents visa delays and unexpected healthcare costs.</p>

            <h2>What Happens After Arrival (and Why It Matters)</h2>

            <p>Relocation does not end when you land.</p>

            <p>In many countries, digital nomads must:</p>

            <ul>
                <li>register their address,</li>
                <li>apply for residence cards,</li>
                <li>obtain tax or identification numbers,</li>
                <li>track days spent in the country.</li>
            </ul>

            <p><strong>Deadlines matter.</strong> Missing them can result in fines, permit issues, or future visa refusals. Keeping records and confirmations is essential.</p>

            <h2>Common Relocation Mistakes Digital Nomads Make</h2>

            <h3>1. Relying on Tourist Visas for Long Stays</h3>
            <p>One of the most common mistakes is assuming a tourist visa allows remote work or extended stays. Many countries explicitly prohibit working (even remotely) on a tourist visa, and overstaying can result in bans.</p>

            <h3>2. Ignoring Tax Residency Triggers</h3>
            <p>Another frequent error is ignoring tax residency rules until it's too late. The 183-day rule exists in many countries, and staying longer can automatically make you a tax resident — even if you didn't plan for it.</p>

            <h3>3. Delaying Document Preparation</h3>
            <p>Others include waiting until the last minute to gather documents. Apostilles, translations, and background checks can take weeks, and missing a deadline can derail your entire relocation timeline.</p>

            <h3>4. Assuming Rules Are the Same Everywhere</h3>
            <p>Each country has different requirements for visas, registration, and compliance. What worked in Portugal may not work in Thailand. Always verify local rules.</p>

            <p>Most relocation problems are not caused by bad luck, but by incomplete planning and false assumptions.</p>

            <div className="cta-box">
                <h2>Download the Fillable Relocation Checklist (PDF)</h2>
                <p>This article explains the relocation process in detail. If you want a practical, printable checklist you can use while planning, download the fillable PDF version below.</p>
                <a href="/downloads/Relocation_Checklist_for_Digital_Nomads.pdf" className="cta-button" download>📥 Download the Relocation Checklist (PDF)</a>
                <p style={{fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0}}>The PDF is designed to complement this guide, not replace it.</p>
            </div>

            <h2>Frequently Asked Questions</h2>

            <h3>How early should I start planning relocation?</h3>
            <p>Ideally two to four months before your move, especially if visas or background checks are required.</p>

            <h3>Can I relocate using only a tourist visa?</h3>
            <p>Tourist visas are rarely suitable for long-term living or remote work. Always verify legal limitations.</p>

            <h3>Is this guide valid for all countries?</h3>
            <p>The principles are universal, but specific rules vary by country and visa type.</p>

            <h3>Should I consult professionals?</h3>
            <p>For taxes, visas, and legal matters, consulting qualified professionals is strongly recommended.</p>

            <h2>Final Thoughts</h2>

            <p>Relocating as a digital nomad is entirely manageable when approached as a structured process. Understanding each stage — and why it matters — helps you avoid common mistakes and make informed decisions.</p>

            <p>Use this guide as your foundation, and adapt each step to your destination and personal situation.</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default RelocationChecklist;
