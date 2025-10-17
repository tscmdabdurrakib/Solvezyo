import { Helmet } from 'react-helmet';
import ConvertXmlToString from '@/tools/text-string/convert-xml-to-string';

export default function ConvertXmlToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert XML to String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert XML markup to escaped string format. Transform XML tags to safe string representation with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Convert XML to String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert XML markup to escaped string format
          </p>
        </div>
        <ConvertXmlToString />
      </div>
    </>
  );
}
