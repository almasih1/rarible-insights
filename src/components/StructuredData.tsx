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
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rarible Insights",
      logo: {
        "@type": "ImageObject",
        url: "https://your-domain.com/logo.png",
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
    name: "Rarible Insights",
    url: "https://your-domain.com",
    logo: "https://your-domain.com/logo.png",
    description: "Expert insights on digital nomad lifestyle, geopolitics, treasury strategies, and solopreneur success.",
    sameAs: [
      "https://twitter.com/raribleinsights",
      "https://linkedin.com/company/raribleinsights",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@rarible-insights.com",
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
    name: "Rarible Insights",
    url: "https://your-domain.com",
    description: "Expert insights on digital nomad lifestyle, geopolitics, treasury strategies, and solopreneur success.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://your-domain.com/search?q={search_term_string}",
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
