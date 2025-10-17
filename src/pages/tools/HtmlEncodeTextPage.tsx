import { Helmet } from 'react-helmet';
import HtmlEncodeText from '@/tools/text-string/html-encode-text';

export default function HtmlEncodeTextPage() {
  return (
    <>
      <Helmet>
        <title>HTML-encode Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Encode HTML special characters for safe display. Perfect for preventing XSS and displaying code." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            HTML-encode Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode HTML special characters for safe display
          </p>
        </div>
        <HtmlEncodeText />
      </div>
    </>
  );
}
