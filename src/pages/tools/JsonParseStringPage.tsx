import { Helmet } from 'react-helmet';
import JsonParseString from '@/tools/text-string/json-parse-string';

export default function JsonParseStringPage() {
  return (
    <>
      <Helmet>
        <title>JSON Parse String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Parse JSON-escaped string back to readable format. Convert JSON stringified text to original string with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            JSON Parse String
          </h1>
          <p className="text-muted-foreground mt-2">
            Parse JSON-escaped string back to readable format
          </p>
        </div>
        <JsonParseString />
      </div>
    </>
  );
}
