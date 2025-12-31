import { Helmet } from "react-helmet-async";

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  category: string;
  url: string;
}

export const ArticleSchema = ({
  title,
  description,
  image,
  author,
  publishedTime,
  modifiedTime,
  category,
  url,
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Organization",
      name: author,
      url: "https://www.rariblenomads.info/about"
    },
    publisher: {
      "@type": "Organization",
      name: "Rarible Nomads",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rariblenomads.info/logo.png",
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: category,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rarible Nomads",
    url: "https://www.rariblenomads.info",
    logo: "https://www.rariblenomads.info/logo.png",
    description: "Independent information platform with guides, checklists, and insights to help digital nomads understand relocation, visas, taxes, and life abroad.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@rariblenomads.info",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rarible Nomads",
    url: "https://www.rariblenomads.info",
    description: "Independent information platform with guides, checklists, and insights to help digital nomads understand relocation, visas, taxes, and life abroad.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.rariblenomads.info/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
