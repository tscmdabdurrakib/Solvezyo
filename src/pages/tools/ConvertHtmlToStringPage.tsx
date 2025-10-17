import { Helmet } from 'react-helmet';
import ConvertHtmlToString from '@/tools/text-string/convert-html-to-string';

export default function ConvertHtmlToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert HTML to String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert HTML markup to escaped string format. Transform HTML tags to safe string representation with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Convert HTML to String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert HTML markup to escaped string format
          </p>
        </div>
        <ConvertHtmlToString />
      </div>
    </>
  );
}
