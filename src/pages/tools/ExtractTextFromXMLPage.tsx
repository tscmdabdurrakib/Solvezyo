import { Helmet } from 'react-helmet';
import ExtractTextFromXML from '@/tools/text-string/extract-text-from-xml';

export default function ExtractTextFromXMLPage() {
  return (
    <>
      <Helmet>
        <title>Extract Text from XML - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all XML tags and extract plain text content from XML documents." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Extract Text from XML
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all XML tags and extract plain text content
          </p>
        </div>
        <ExtractTextFromXML />
      </div>
    </>
  );
}
