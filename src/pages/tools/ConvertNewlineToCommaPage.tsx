import { Helmet } from 'react-helmet';
import ConvertNewlineToComma from '@/tools/text-string/convert-newline-to-comma';

export default function ConvertNewlineToCommaPage() {
  return (
    <>
      <Helmet>
        <title>Convert Newline to Comma - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all line breaks with commas. Convert newlines to comma-separated values instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Newline to Comma
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all line breaks with commas in your text
          </p>
        </div>
        <ConvertNewlineToComma />
      </div>
    </>
  );
}
