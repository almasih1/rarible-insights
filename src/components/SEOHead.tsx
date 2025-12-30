import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  article?: boolean;
  category?: string;
}

const SEOHead = ({
  title = "Rarible Insights - Smart Lifestyle, Relocation & Tax Decisions",
  description = "Expert insights on digital nomad lifestyle, geopolitics, treasury strategies, and solopreneur success. Join 1,851+ readers making smarter decisions.",
  keywords = "digital nomads, geopolitics, treasury desk, solopreneur, relocation, tax optimization, lifestyle design, remote work, financial freedom",
  image = "https://your-domain.com/og-image.jpg",
  url = "https://your-domain.com",
  type = "website",
  author = "Rarible Insights",
  publishedTime,
  modifiedTime,
  article = false,
  category,
}: SEOHeadProps) => {
  const siteName = "Rarible Insights";
  const twitterHandle = "@raribleinsights";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}
      {article && category && (
        <meta property="article:section" content={category} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content={twitterHandle} />
      <meta property="twitter:creator" content={twitterHandle} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Helmet>
  );
};

export default SEOHead;
