import { Helmet } from 'react-helmet';
import ConvertCommaToNewline from '@/tools/text-string/convert-comma-to-newline';

export default function ConvertCommaToNewlinePage() {
  return (
    <>
      <Helmet>
        <title>Convert Comma to Newline - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all commas with line breaks. Convert comma-separated values to newlines instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Comma to Newline
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all commas with line breaks in your text
          </p>
        </div>
        <ConvertCommaToNewline />
      </div>
    </>
  );
}
