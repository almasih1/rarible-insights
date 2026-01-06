import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import logo from "@/assets/logo.png";
import { supabase } from "@/lib/supabaseClient";
import { Clock, CheckCircle2, ArrowLeft } from "lucide-react";

interface SeoCategory {
  id: string;
  slug: string;
  title: string;
  h1_text: string;
  intro_text: string;
  key_topics: string[];
  meta_title?: string;
  meta_description?: string;
}

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

// Category-specific content
const CATEGORY_CONTENT: Record<string, {
  intro: string;
  keyTopics: string[];
  startHere: { title: string; href: string }[];
  commonMistakes: string[];
  connectionText: string;
  connectionLinks?: { text: string; href: string }[];
}> = {
  "visas-residency": {
    intro: "Visas and residency rules are the foundation of a legal relocation. For digital nomads, the main risk is treating a long stay like \"extended travel\" — and accidentally overstaying, working on the wrong status, or missing paperwork that immigration expects. Requirements vary by country, but the logic is similar: you need a valid passport, proof of income or remote work, clean background documentation when required, and a plan that matches the length of stay you actually want.\n\nThis section focuses on practical visa and residency decisions: how to think about stay limits, what documents are commonly requested, and what usually causes delays or refusals. If you're planning to live abroad for 6–12 months (or longer), start here and make sure your relocation plan is built on the correct legal status.",
    keyTopics: [
      "Digital nomad visas and long-stay visas",
      "Residency permits vs visas: what's the difference",
      "Typical eligibility requirements (income, remote work proof)",
      "Stay limits, renewals, and overstays",
      "Document packages and common rejection reasons",
    ],
    startHere: [
      { title: "Relocation Checklist for Digital Nomads", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
      { title: "Documents Needed for Digital Nomads", href: "/digital-nomad-relocation/documents-needed-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
    ],
    commonMistakes: [
      "Planning a 6–12 month stay on a tourist status",
      "Assuming \"remote work\" is automatically allowed",
      "Under-preparing documents (translations, apostille, bank letters)",
      "Ignoring renewal timelines and appointment availability",
      "Applying with inconsistent proof of income / employment",
    ],
    connectionText: "Visas and residency determine what you can legally do, how long you can stay, and what other systems you can access (banking, housing contracts, insurance). Before you choose a country, map your timeline and document readiness using the Relocation Checklist. Then build your document package early — most delays happen because a \"small\" document is missing or formatted incorrectly. Once your legal status is clear, the next steps become easier: housing, banking, and insurance can be planned around your approved length of stay.",
    connectionLinks: [
      { text: "Hub", href: "/digital-nomad-relocation" },
    ],
  },
  "taxes-legal": {
    intro: "Taxes and legal compliance are where \"it will probably be fine\" turns into real money risk. Many digital nomads assume that leaving their home country automatically ends tax obligations, or that short stays can't trigger residency. In reality, rules depend on days present, ties to a country, source of income, and local reporting requirements.\n\nThis section explains what typically changes when you relocate: tax residency risk, common reporting triggers, and the legal basics that affect remote workers and freelancers. Even if you're not optimizing anything, you still need a plan that prevents accidental non-compliance. The goal here is simple: help you understand the moving pieces early so your relocation doesn't create a tax mess later.",
    keyTopics: [
      "Tax residency risk and \"days in country\" rules",
      "Common reporting obligations",
      "Legal compliance basics for remote workers",
      "Double taxation and documentation discipline",
      "Practical prevention: what to track from day one",
    ],
    startHere: [
      { title: "Relocation Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
      { title: "Subscribe for updates", href: "/newsletter" },
    ],
    commonMistakes: [
      "Assuming tax residency can't change without paperwork",
      "Tracking nothing (no dates, no invoices, no proof of ties)",
      "Ignoring \"home country\" obligations after moving",
      "Waiting until year-end to understand requirements",
      "Mixing personal and business finances without records",
    ],
    connectionText: "Legal status, banking access, and documentation quality affect your tax outcomes. If you move frequently, you must track days, keep income proof clean, and understand what triggers reporting. Start with the Relocation Checklist to plan timeline and documentation, then follow hub updates as new tax guides are published.",
    connectionLinks: [
      { text: "Hub", href: "/digital-nomad-relocation" },
    ],
  },
  "banking-finance": {
    intro: "Banking is not just \"open an account and pay rent.\" For digital nomads, the biggest problems come from mismatched documents: address proof, tax status questions, unclear income sources, or transfers that trigger extra checks. Many relocations go sideways when money arrives late, cards don't work, or a bank requests documents you can't produce quickly from abroad.\n\nThis category is about building a stable financial setup: keeping proof of funds ready, understanding what banks typically ask for, and reducing friction when moving countries. The goal is to help you avoid the common operational failures that create expensive delays during relocation.",
    keyTopics: [
      "Proof of funds and bank statement hygiene",
      "Cross-border payments and transfer planning",
      "Avoiding freezes: consistent documentation",
      "Budgeting relocation costs and buffers",
      "Separating personal and work finances",
    ],
    startHere: [
      { title: "Documents Needed", href: "/digital-nomad-relocation/documents-needed-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
      { title: "Subscribe", href: "/newsletter" },
    ],
    commonMistakes: [
      "Keeping no clean proof of income/funds",
      "Depending on a single card/bank",
      "Mixing business and personal payments",
      "Moving money without keeping supporting documents",
      "No cash buffer for deposits and emergencies",
    ],
    connectionText: "Banking decisions depend on documents, legal status, and your relocation timeline. Clean documentation and a buffer reduce stress and prevent delays with landlords, immigration, and insurance. Use the Documents Needed guide to build a reliable document set first, then expand your setup as you settle.",
    connectionLinks: [
      { text: "Docs", href: "/digital-nomad-relocation/documents-needed-for-digital-nomads" },
    ],
  },
  "healthcare-insurance": {
    intro: "Healthcare is one of the most expensive \"unknowns\" in relocation. Some visas require proof of insurance with specific coverage rules, while local healthcare access may depend on residency status. Many nomads buy a policy that looks fine until a claim happens — then discover exclusions, territory limits, or gaps between travel and long-term coverage.\n\nThis section helps you think clearly about the basics: what insurers and visas commonly require, how to avoid coverage mismatches, and what to prepare before you move. The aim is not perfect optimization — it's to prevent the most common failures that turn a medical event into a financial crisis.",
    keyTopics: [
      "Travel vs long-term international insurance",
      "Common visa insurance requirements",
      "Claim pitfalls and exclusion traps",
      "Emergency planning and documentation",
      "Practical planning for long stays",
    ],
    startHere: [
      { title: "Relocation Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
      { title: "Subscribe", href: "/newsletter" },
    ],
    commonMistakes: [
      "Buying insurance that doesn't meet visa rules",
      "Confusing travel insurance with long-term coverage",
      "Not reading exclusions (sports, pre-existing conditions)",
      "No plan for emergencies and paperwork",
      "Waiting to research after arrival",
    ],
    connectionText: "Insurance and healthcare planning sit between legal status and housing/budget decisions. A relocation timeline should include time for policy selection, documentation, and any required confirmations for visa applications. Start with the Relocation Checklist, then update your plan as new guides are added to the hub.",
    connectionLinks: [
      { text: "Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
    ],
  },
  "cost-living-housing": {
    intro: "Housing and cost of living are the fastest way to ruin an otherwise good relocation plan. Deposits, utility setup, short-term premium pricing, and contract rules vary widely — and first-month costs are often much higher than expected. Many nomads budget for \"monthly rent\" but forget: deposit, agency fees, furniture, internet setup, and temporary accommodation while searching.\n\nThis section helps you plan realistically. The goal is to reduce financial surprises and help you avoid common housing traps that cost money and time right when you need stability most.",
    keyTopics: [
      "True first-month cost: deposit + setup + buffers",
      "Short-term vs long-term housing tradeoffs",
      "Typical rental documents and expectations",
      "Utilities, internet, and hidden fees",
      "Practical budgeting for the first 90 days",
    ],
    startHere: [
      { title: "Relocation Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
      { title: "Subscribe", href: "/newsletter" },
    ],
    commonMistakes: [
      "Underestimating deposits and setup costs",
      "Signing contracts without understanding terms",
      "No buffer for temporary accommodation",
      "Choosing housing before confirming legal stay length",
      "Ignoring internet reliability during selection",
    ],
    connectionText: "Your housing plan should match your legal timeline and financial setup. If your stay length changes, housing terms and costs change too. Use the Relocation Checklist to plan sequence: legal status first, then housing with the right duration and documents.",
    connectionLinks: [
      { text: "Hub", href: "/digital-nomad-relocation" },
    ],
  },
  "remote-work-income": {
    intro: "For many relocations, \"income proof\" is the real gatekeeper. It affects visa eligibility, housing approvals, and sometimes banking access. The issue isn't earning money — it's presenting it in a format authorities and counterparties accept: contracts, bank statements, employer letters, invoices, and consistent records.\n\nThis section focuses on the practical side: how to prepare proof of remote work and income so you can move without last-minute stress. It's not about optimization; it's about building a clean documentation trail that supports every other step in the relocation process.",
    keyTopics: [
      "Contracts, employer letters, and client documentation",
      "Proof of income formats that usually work",
      "Bank statements and consistency",
      "Invoices, payment receipts, and record discipline",
      "Avoiding red flags in documentation",
    ],
    startHere: [
      { title: "Relocation Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
      { title: "Documents Needed", href: "/digital-nomad-relocation/documents-needed-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
    ],
    commonMistakes: [
      "Unclear income sources (no consistent proof)",
      "Submitting \"screenshots\" instead of official documents",
      "Not aligning documents (names, dates, amounts)",
      "No contracts/letters for remote work proof",
      "Waiting until visa submission week to prepare",
    ],
    connectionText: "Remote work and income proof connects directly to visas, banking, and housing. If your documentation is clean early, everything else becomes easier and faster. Start with Documents Needed, then validate your plan against the Relocation Checklist timeline.",
    connectionLinks: [
      { text: "Docs", href: "/digital-nomad-relocation/documents-needed-for-digital-nomads" },
    ],
  },
  "safety-infrastructure": {
    intro: "Safety and infrastructure aren't \"nice to have\" for remote work — they're operational requirements. Unreliable internet, poor mobile coverage, or local scams can disrupt work and finances immediately. Many nomads plan visas and flights but ignore infrastructure until after arrival, when fixes are expensive or stressful.\n\nThis section helps you plan the basics: internet reliability, SIM setup, workspace options, and simple risk reduction. The goal is to protect your ability to work and live normally from day one.",
    keyTopics: [
      "Internet reliability and backup options",
      "SIM/eSIM planning and local connectivity",
      "Workspace resilience and redundancy",
      "Basic scam awareness and safety habits",
      "Emergency planning for remote workers",
    ],
    startHere: [
      { title: "Relocation Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
      { title: "Back to the hub", href: "/digital-nomad-relocation" },
      { title: "Subscribe", href: "/newsletter" },
    ],
    commonMistakes: [
      "No internet backup plan",
      "Relying on one SIM / one network",
      "Ignoring local scams and \"tourist traps\"",
      "Poor documentation security (no backups)",
      "No emergency contacts and basic plan",
    ],
    connectionText: "Infrastructure planning is the layer that makes relocation sustainable: it protects your work continuity and reduces operational stress. Tie these decisions to your housing and banking setup and follow the relocation sequence in the hub. Start with the Relocation Checklist to ensure these items are planned early, not \"later.\"",
    connectionLinks: [
      { text: "Checklist", href: "/digital-nomad-relocation/relocation-checklist-for-digital-nomads" },
    ],
  },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<SeoCategory | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndArticles();
    }
  }, [slug]);

  const fetchCategoryAndArticles = async () => {
    try {
      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from("seo_categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch articles for this category
      const { data: articlesData, error: articlesError } = await supabase
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
        .eq("seo_category_id", categoryData.id)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (articlesError) throw articlesError;
      setArticles(articlesData || []);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  const canonicalUrl = `https://www.rariblenomads.info/digital-nomad-relocation/category/${category.slug}`;
  const content = CATEGORY_CONTENT[category.slug] || CATEGORY_CONTENT["visas-residency"];

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: category.meta_title || `${category.title} | Rarible Nomads`,
    description: category.meta_description || content.intro.substring(0, 160),
    url: canonicalUrl,
  };

  return (
    <>
      <SEOHead 
        title={category.meta_title || `${category.title} | Rarible Nomads`}
        description={category.meta_description || content.intro.substring(0, 160)}
        keywords={`${category.title}, digital nomad relocation, ${category.key_topics?.join(", ")}`}
        url={canonicalUrl}
      />
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.rariblenomads.info" },
          { name: "Digital Nomad Relocation", url: "https://www.rariblenomads.info/digital-nomad-relocation" },
          { name: category.title, url: canonicalUrl }
        ]}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold text-foreground">Rarible Nomads</span>
            </Link>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 py-6">
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
                <BreadcrumbPage>{category.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Category Content */}
        <main className="max-w-4xl mx-auto px-4 pb-16">
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {category.h1_text || category.title}
          </h1>

          {/* Intro Text */}
          <div className="mb-12">
            {content.intro.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base text-muted-foreground mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Topics Covered */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Key Topics Covered</h2>
            <ul className="space-y-3">
              {content.keyTopics.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Start Here */}
          <div className="mb-12 bg-muted/30 border border-border/40 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Start here (recommended)</h2>
            <div className="space-y-3">
              {content.startHere.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.href}
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Articles List */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Articles</h2>
            
            {articles.length === 0 ? (
              <div className="text-center py-12 border border-border/40 rounded-xl bg-muted/20">
                <p className="text-muted-foreground mb-4">No articles published yet. We're working on this section.</p>
                <Link to="/newsletter">
                  <Button variant="outline">Subscribe for updates</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {articles.map((article) => (
                  <article key={article.id} className="border border-border/40 rounded-xl p-6 hover:border-border hover:shadow-md transition-all bg-card">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                        {article.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/digital-nomad-relocation/${article.slug}`}>
                          <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        {article.meta_description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {article.meta_description}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>
                            {new Date(article.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span>·</span>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.read_time} min read</span>
                          </div>
                          {article.seo_category && (
                            <>
                              <span>·</span>
                              <Link
                                to={`/digital-nomad-relocation/category/${article.seo_category.slug}`}
                              >
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                  {article.seo_category.title}
                                </Badge>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Stay Updated CTA */}
          <div className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Stay updated</h2>
            <p className="text-muted-foreground mb-6">
              Get new relocation guides and checklists as we publish them.
            </p>
            <Link to="/newsletter">
              <Button size="lg">Subscribe</Button>
            </Link>
          </div>

          {/* Common Mistakes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Common mistakes</h2>
            <ul className="space-y-3">
              {content.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span className="text-muted-foreground">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connection Block */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">How this connects to the relocation process</h2>
            <p className="text-base text-muted-foreground mb-4 leading-relaxed">
              {content.connectionText}
            </p>
            {content.connectionLinks && content.connectionLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {content.connectionLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.href}
                    className="text-primary hover:underline font-medium"
                  >
                    {link.text} →
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Back to Hub */}
          <div className="border-t border-border/30 pt-8">
            <Link 
              to="/digital-nomad-relocation"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Digital Nomad Relocation
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
