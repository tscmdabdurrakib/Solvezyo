import { Helmet } from 'react-helmet';
import HtmlDecodeText from '@/tools/text-string/html-decode-text';

export default function HtmlDecodeTextPage() {
  return (
    <>
      <Helmet>
        <title>HTML-decode Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Decode HTML entities to readable text. Perfect for parsing HTML and reading encoded content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            HTML-decode Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Decode HTML entities to readable text
          </p>
        </div>
        <HtmlDecodeText />
      </div>
    </>
  );
}
