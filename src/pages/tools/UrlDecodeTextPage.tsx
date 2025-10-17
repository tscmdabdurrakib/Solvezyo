import { Helmet } from 'react-helmet';
import UrlDecodeText from '@/tools/text-string/url-decode-text';

export default function UrlDecodeTextPage() {
  return (
    <>
      <Helmet>
        <title>URL-decode Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Decode URL-encoded text to readable format. Perfect for analyzing query parameters and URLs." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            URL-decode Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Decode URL-encoded text to readable format
          </p>
        </div>
        <UrlDecodeText />
      </div>
    </>
  );
}
