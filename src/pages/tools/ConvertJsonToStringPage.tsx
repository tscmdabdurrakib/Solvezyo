import { Helmet } from 'react-helmet';
import ConvertJsonToString from '@/tools/text-string/convert-json-to-string';

export default function ConvertJsonToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert JSON to String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert JSON object or array to a compact string format. Transform JSON data to string representation with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Convert JSON to String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert JSON object or array to a compact string format
          </p>
        </div>
        <ConvertJsonToString />
      </div>
    </>
  );
}
