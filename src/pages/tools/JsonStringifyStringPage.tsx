import { Helmet } from 'react-helmet';
import JsonStringifyString from '@/tools/text-string/json-stringify-string';

export default function JsonStringifyStringPage() {
  return (
    <>
      <Helmet>
        <title>JSON Stringify String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert string to JSON-safe format with proper escaping. Transform text to JSON stringified format with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            JSON Stringify String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert string to JSON-safe format with proper escaping
          </p>
        </div>
        <JsonStringifyString />
      </div>
    </>
  );
}
