import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

const DocumentsNeeded = () => {
  return (
    <>
      <SEOHead 
        title="Documents for Digital Nomads: What You Need Before Relocating"
        description="A complete overview of documents digital nomads need for relocation: visas, income proof, insurance, translations, and preparation strategy."
        keywords="documents for digital nomads, relocation documents, visa paperwork, expat documents"
        url="https://www.rariblenomads.info/digital-nomad-relocation/documents-needed"
      />

      <div className="min-h-screen bg-background">
        <header className="border-b border-border/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold text-foreground">
                rarible insights
              </span>
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
            Documents for Digital Nomads: What You Need Before Relocating
          </h1>

          <div className="space-y-6 text-foreground leading-relaxed">
            <p className="text-muted-foreground">
              Documents are the foundation of every successful relocation.
              Visas, banking, housing, healthcare, and even basic services abroad
              depend on whether your paperwork is complete, consistent, and
              properly prepared.
            </p>

            <p className="text-muted-foreground">
              For digital nomads, documentation is more complex than for
              traditional expats. You may earn income remotely, move frequently,
              and lack a permanent address — all of which increases scrutiny
              from immigration authorities, banks, and service providers.
            </p>

            <h2 className="text-2xl font-semibold mt-10">
              Core document categories digital nomads need
            </h2>

            <p className="text-muted-foreground">
              While requirements vary by country, most relocation processes rely
              on the same document groups. Understanding these categories early
              prevents delays, rejections, and last-minute stress.
            </p>

            <h3 className="text-xl font-semibold mt-6">
              Identity and travel documents
            </h3>
            <p className="text-muted-foreground">
              A valid passport with sufficient remaining validity is the base of
              everything. Many countries require 6–12 months of validity beyond
              your intended stay, as well as blank pages for visas.
            </p>

            <h3 className="text-xl font-semibold mt-6">
              Proof of income and financial stability
            </h3>
            <p className="text-muted-foreground">
              Digital nomads are often required to prove income through contracts,
              bank statements, invoices, or platform earnings. The goal is to
              demonstrate consistency and legality, not just total amounts.
            </p>

            <h3 className="text-xl font-semibold mt-6">
              Health insurance documentation
            </h3>
            <p className="text-muted-foreground">
              Many visas and residence permits require international health
              insurance covering specific periods and minimum coverage amounts.
              Incomplete policies are a common reason for application rejection.
            </p>

            <h3 className="text-xl font-semibold mt-6">
              Background checks and certificates
            </h3>
            <p className="text-muted-foreground">
              Police clearance certificates or criminal record checks are often
              mandatory. These documents usually have expiration windows and may
              require apostilles or official translations.
            </p>

            <h3 className="text-xl font-semibold mt-6">
              Translations and legalization
            </h3>
            <p className="text-muted-foreground">
              Documents not issued in the local language frequently need certified
              translations. Some countries also require apostilles or consular
              legalization, which can take weeks.
            </p>

            <h2 className="text-2xl font-semibold mt-10">
              Why document preparation matters more than people expect
            </h2>

            <p className="text-muted-foreground">
              Most relocation problems are not caused by missing documents, but
              by mismatched information. Different names, inconsistent addresses,
              unclear income sources, or outdated paperwork can trigger additional
              reviews or rejections.
            </p>

            <p className="text-muted-foreground">
              Preparing documents as a system — rather than individually — helps
              everything align across visas, banks, landlords, and tax authorities.
            </p>

            <h2 className="text-2xl font-semibold mt-10">
              How this fits into the full relocation process
            </h2>

            <p className="text-muted-foreground">
              Documentation connects directly to visas, banking, healthcare, and
              taxes. It’s one of the first steps digital nomads should handle
              before choosing destinations or timelines.
            </p>

            <p className="text-muted-foreground">
              For a practical checklist of specific documents and preparation
              steps, see our detailed guide:
              <Link
                to="/digital-nomad-relocation/documents-needed-for-digital-nomads"
                className="text-primary underline ml-1"
              >
                Documents Needed for Digital Nomads
              </Link>
            </p>

            <p className="text-muted-foreground">
              To understand how documents fit into visas, banking, and relocation
              timing, return to the
              <Link
                to="/digital-nomad-relocation"
                className="text-primary underline ml-1"
              >
                Digital Nomad Relocation Hub
              </Link>.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DocumentsNeeded;