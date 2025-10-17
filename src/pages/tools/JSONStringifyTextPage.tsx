import { Helmet } from 'react-helmet';
import JSONStringifyText from '@/tools/text-string/json-stringify-text';

export default function JSONStringifyTextPage() {
  return (
    <>
      <Helmet>
        <title>JSON Stringify Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to JSON string format with properly escaped characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            JSON Stringify Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to JSON string format with escaped characters
          </p>
        </div>
        <JSONStringifyText />
      </div>
    </>
  );
}
