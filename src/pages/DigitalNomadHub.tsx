import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, WebsiteSchema } from "@/components/StructuredData";
import logo from "@/assets/logo.png";
import { supabase } from "@/lib/supabaseClient";
import { Clock, Download, ArrowRight, CheckCircle2 } from "lucide-react";

interface Article {
  id: string;
  slug: string;
  title: string;
  icon: string;
  read_time: number;
  created_at: string;
  meta_description?: string;
  seo_category?: {
    id: string;
    title: string;
    slug: string;
  };
}

interface CategoryCard {
  title: string;
  slug: string;
  description: string;
  icon: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    title: "Visas & Residency",
    slug: "visas-residency",
    description: "Visas, residence permits, income proof, and country requirements.",
    icon: "🛂",
  },
  {
    title: "Taxes & Legal",
    slug: "taxes-legal",
    description: "Tax residency, reporting basics, legal pitfalls, compliance checklists.",
    icon: "📋",
  },
  {
    title: "Banking & Finance",
    slug: "banking-finance",
    description: "International banking setup, cards, transfers, and financial hygiene.",
    icon: "💳",
  },
  {
    title: "Healthcare & Insurance",
    slug: "healthcare-insurance",
    description: "Coverage options, claims logic, emergencies, and travel vs expat plans.",
    icon: "🏥",
  },
  {
    title: "Cost of Living & Housing",
    slug: "cost-living-housing",
    description: "Budgeting, rent workflows, deposits, utilities, and realistic monthly costs.",
    icon: "🏠",
  },
  {
    title: "Remote Work & Income",
    slug: "remote-work-income",
    description: "Contracts, income proof, client paperwork, and remote work operations.",
    icon: "💼",
  },
  {
    title: "Safety & Infrastructure",
    slug: "safety-infrastructure",
    description: "Internet reliability, SIMs, operational security, scams, and safety planning.",
    icon: "🔒",
  },
];

const QUICK_LINKS = [
  {
    label: "Start with the Checklist",
    href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads",
  },
  {
    label: "Visas & Residency",
    href: "/digital-nomad-relocation/category/visas-residency",
  },
  {
    label: "Taxes & Legal",
    href: "/digital-nomad-relocation/category/taxes-legal",
  },
  {
    label: "Get Updates",
    href: "/newsletter",
  },
];

const START_HERE_STEPS = [
  {
    title: "Relocation Checklist",
    href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads",
  },
  {
    title: "Documents Needed",
    href: "/digital-nomad-relocation/documents-needed-for-digital-nomads",
  },
  {
    title: "Visas & Residency",
    href: "/digital-nomad-relocation/category/visas-residency",
  },
  {
    title: "Taxes & Legal",
    href: "/digital-nomad-relocation/category/taxes-legal",
  },
  {
    title: "Banking & Insurance setup",
    href: "/digital-nomad-relocation/category/banking-finance",
  },
];

const DigitalNomadHub = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          slug,
          title,
          icon,
          read_time,
          created_at,
          meta_description,
          seo_category:seo_categories(id, title, slug)
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const canonicalUrl = "https://www.rariblenomads.info/digital-nomad-relocation";

  return (
    <>
      <SEOHead
        title="Digital Nomad Relocation Guide (2026) | Rarible Nomads"
        description="Expert guides and checklists to plan digital nomad relocation: visas, documents, taxes, banking, insurance, housing, and safety."
        keywords="digital nomad relocation, visa requirements, tax residency, international banking, expat insurance, relocation checklist"
        url={canonicalUrl}
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.rariblenomads.info" },
          { name: "Digital Nomad Relocation", url: canonicalUrl },
        ]}
      />

      <WebsiteSchema />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/30">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold text-foreground">rarible insights</span>
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Digital Nomad Relocation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert guides, checklists, and insights to help you relocate as a digital nomad.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              From visas to taxes, we've got you covered.
            </p>

            {/* Pillar Intro */}
            <div className="bg-muted/30 border border-border/40 rounded-xl p-6 mb-8">
              <p className="text-base leading-relaxed text-foreground">
                Digital nomad relocation is not just long-term travel — it's a structured move that involves visas, documents, tax residency, banking, healthcare, and legal compliance. This hub collects practical guides and checklists to help you plan a relocation step by step: what documents to prepare, how to prove income, how to avoid tax and residency mistakes, and how to set up a sustainable "home base" abroad. Use the topic pages below to navigate by intent (visas, taxes, banking, insurance, housing, remote work, safety), and start with the checklist if you're relocating in the next 30–90 days.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-3 px-4 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Download PDF CTA */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  Download the fillable Relocation Checklist PDF
                </p>
                <p className="text-xs text-muted-foreground">
                  Plan your move in 30 minutes
                </p>
              </div>
              <a
                href="https://www.rariblenomads.info/downloads/Relocation_Checklist_for_Digital_Nomads.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2 flex-shrink-0">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </a>
            </div>
          </section>

          {/* Browse by Topic */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Browse by topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to={`/digital-nomad-relocation/category/${category.slug}`}
                  className="group border border-border/40 rounded-xl p-6 hover:border-border hover:shadow-md transition-all bg-card"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Start Here */}
          <section className="mb-16">
            <div className="bg-muted/30 border border-border/40 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Start here (recommended order)
              </h2>
              <div className="space-y-4">
                {START_HERE_STEPS.map((step, index) => (
                  <Link
                    key={step.href}
                    to={step.href}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Latest Guides */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Latest guides</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading articles...</p>
            ) : articles.length === 0 ? (
              <p className="text-muted-foreground">No articles yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/digital-nomad-relocation/${article.slug}`}
                    className="group border border-border/40 rounded-xl p-6 hover:border-border hover:shadow-md transition-all bg-card"
                  >
                    <div className="text-2xl mb-3">{article.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    {/* Excerpt */}
                    {article.meta_description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {article.meta_description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {new Date(article.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.read_time} min read</span>
                      </div>
                      {article.seo_category && (
                        <>
                          <span>·</span>
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0 rounded bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {article.seo_category.title}
                          </Badge>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* SEO Content */}
          <section className="prose prose-neutral max-w-none mb-16">
            <h2>What "relocation" means for digital nomads</h2>
            <p>
              Digital nomad relocation is different from tourism or short-term travel. It involves establishing legal residency, maintaining tax compliance, setting up local banking, and proving stable income to immigration authorities. Unlike traditional expats sent by employers, digital nomads must handle the entire process independently—often without clear instructions or local support.
            </p>
            <p>
              The term "relocation" in this context means moving to a new country with the intent to stay long-term (typically 6–12 months or more), while maintaining remote work and complying with local visa, tax, and residency regulations. It requires careful planning across multiple areas: legal status, financial infrastructure, healthcare coverage, and operational logistics.
            </p>

            <h2>The 7 pillars of a clean relocation</h2>
            <p>
              A successful digital nomad relocation depends on getting seven core areas right. Each pillar connects to the others—mistakes in one area often create problems elsewhere. Below is a breakdown of what each pillar covers and why it matters.
            </p>

            <h3>Visas & Residency</h3>
            <p>
              Understanding <Link to="/digital-nomad-relocation/category/visas-residency" className="text-primary hover:underline">visa requirements and residency permits</Link> is the foundation of any relocation. Different countries offer different pathways: tourist visas, digital nomad visas, freelance visas, or residence-by-investment programs. Each has specific income thresholds, documentation requirements, and renewal conditions. Choosing the wrong visa type or missing a single document can delay applications by months.
            </p>

            <h3>Documents</h3>
            <p>
              Proper documentation goes beyond just having a passport. You'll need apostilled certificates, translated bank statements, proof of income contracts, criminal record checks, and sometimes notarized letters from employers or clients. Missing or incorrectly prepared documents are the most common reason visa applications get rejected or delayed. Learn more in our <Link to="/digital-nomad-relocation/documents-needed-for-digital-nomads" className="text-primary hover:underline">documents guide</Link>.
            </p>

            <h3>Taxes</h3>
            <p>
              Tax residency rules determine where you owe taxes—and they're not always straightforward. Simply leaving your home country doesn't automatically end your tax obligations there. Understanding <Link to="/digital-nomad-relocation/category/taxes-legal" className="text-primary hover:underline">tax residency rules, reporting requirements, and compliance deadlines</Link> prevents legal problems and unexpected tax bills. Many digital nomads face issues because they assume tax rules are simpler than they actually are.
            </p>

            <h3>Banking</h3>
            <p>
              International <Link to="/digital-nomad-relocation/category/banking-finance" className="text-primary hover:underline">banking setup</Link> is essential for receiving payments, paying rent, and managing day-to-day expenses. Some countries require proof of a local bank account for visa applications. Opening an account abroad often requires proof of address, tax residency documentation, and sometimes a local phone number. Without proper banking infrastructure, even simple financial tasks become complicated.
            </p>

            <h3>Insurance & Healthcare</h3>
            <p>
              <Link to="/digital-nomad-relocation/category/healthcare-insurance" className="text-primary hover:underline">Health insurance and healthcare access</Link> vary dramatically by country. Some visas require proof of international health insurance with minimum coverage amounts. Understanding the difference between travel insurance, expat insurance, and local health systems is critical. A medical emergency without proper coverage can cost tens of thousands of dollars.
            </p>

            <h3>Housing & Cost of Living</h3>
            <p>
              Realistic <Link to="/digital-nomad-relocation/category/cost-living-housing" className="text-primary hover:underline">budgeting for housing and daily expenses</Link> prevents financial stress. Rental markets work differently in each country—deposits, contracts, utility setups, and landlord expectations vary widely. Underestimating costs or choosing the wrong neighborhood can derail an otherwise well-planned relocation.
            </p>

            <h3>Safety & Infrastructure</h3>
            <p>
              Reliable internet, local SIM cards, and <Link to="/digital-nomad-relocation/category/safety-infrastructure" className="text-primary hover:underline">operational security</Link> are non-negotiable for remote work. Beyond logistics, understanding local scams, safety protocols, and emergency procedures is essential. Infrastructure failures—whether internet outages or safety incidents—can jeopardize work commitments and personal security.
            </p>

            <h2>Common mistakes (and how to avoid them)</h2>
            <p>
              Most relocation problems are avoidable. The biggest mistakes digital nomads make include:
            </p>
            <ul>
              <li><strong>Starting the process too late.</strong> Visa applications can take 2–6 months. Apostilling documents can take weeks. Waiting until the last minute creates unnecessary stress and higher costs.</li>
              <li><strong>Assuming tourist visas are enough.</strong> Overstaying a tourist visa—even by accident—can result in bans from re-entering the country.</li>
              <li><strong>Ignoring tax obligations in the home country.</strong> Leaving doesn't automatically end tax residency. Many people owe back taxes because they assumed they were "off the grid."</li>
              <li><strong>Not having a backup plan.</strong> Visa rejections happen. Having alternative destinations and contingency timelines prevents last-minute scrambling.</li>
              <li><strong>Underestimating documentation requirements.</strong> "Close enough" doesn't work with immigration authorities. Documents must match requirements exactly.</li>
            </ul>

            <h2>How we update this hub</h2>
            <p>
              Relocation rules, visa policies, and tax regulations change frequently. We update this hub regularly based on:
            </p>
            <ul>
              <li>Official government sources and embassy announcements</li>
              <li>Community reports from digital nomads currently relocating</li>
              <li>Changes to visa programs, tax treaties, and residency requirements</li>
              <li>Feedback from readers who've recently completed relocations</li>
            </ul>
            <p>
              If you notice outdated information or have corrections, please reach out via our <Link to="/contact" className="text-primary hover:underline">contact page</Link>. Accurate, up-to-date information is critical for relocation planning.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DigitalNomadHub;
