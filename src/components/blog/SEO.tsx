import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  authorUrl?: string;
  publishedDate?: string;
  modifiedDate?: string;
  tags?: string[];
  type?: "website" | "article";
  structuredData?: object;
}

export function SEO({
  title,
  description,
  image,
  url,
  author,
  authorUrl,
  publishedDate,
  modifiedDate,
  tags,
  type = "website",
  structuredData,
}: SEOProps) {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image || `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title} | Solvezyo</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Solvezyo" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedDate && (
            <meta property="article:published_time" content={publishedDate} />
          )}
          {modifiedDate && (
            <meta property="article:modified_time" content={modifiedDate} />
          )}
          {tags &&
            tags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
}
