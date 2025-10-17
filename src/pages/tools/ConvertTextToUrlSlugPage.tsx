import { Helmet } from 'react-helmet';
import ConvertTextToUrlSlug from '@/tools/text-string/convert-text-to-url-slug';

export default function ConvertTextToUrlSlugPage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to URL Slug - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform text into SEO-friendly URL slugs. Perfect for blog posts, articles, and web pages." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Text to URL Slug
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform text into SEO-friendly URL slugs
          </p>
        </div>
        <ConvertTextToUrlSlug />
      </div>
    </>
  );
}
