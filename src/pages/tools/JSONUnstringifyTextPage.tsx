import { Helmet } from 'react-helmet';
import JSONUnstringifyText from '@/tools/text-string/json-unstringify-text';

export default function JSONUnstringifyTextPage() {
  return (
    <>
      <Helmet>
        <title>JSON Unstringify Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert JSON string format back to plain text with unescaped characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            JSON Unstringify Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert JSON string format back to plain text
          </p>
        </div>
        <JSONUnstringifyText />
      </div>
    </>
  );
}
