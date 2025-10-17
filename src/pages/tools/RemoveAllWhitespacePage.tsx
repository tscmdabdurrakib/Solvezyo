import { Helmet } from 'react-helmet';
import RemoveAllWhitespace from '@/tools/text-string/remove-all-whitespace';

export default function RemoveAllWhitespacePage() {
  return (
    <>
      <Helmet>
        <title>Remove All Whitespace - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all spaces, tabs, and line breaks from your text. Complete whitespace elimination tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove All Whitespace
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all spaces, tabs, and line breaks from your text
          </p>
        </div>
        <RemoveAllWhitespace />
      </div>
    </>
  );
}
