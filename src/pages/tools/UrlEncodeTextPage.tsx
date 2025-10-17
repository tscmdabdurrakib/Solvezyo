import { Helmet } from 'react-helmet';
import UrlEncodeText from '@/tools/text-string/url-encode-text';

export default function UrlEncodeTextPage() {
  return (
    <>
      <Helmet>
        <title>URL-encode Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Encode text for safe use in URLs. Perfect for query parameters and API calls." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            URL-encode Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode text for safe use in URLs
          </p>
        </div>
        <UrlEncodeText />
      </div>
    </>
  );
}
