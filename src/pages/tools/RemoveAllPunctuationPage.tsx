import { Helmet } from 'react-helmet';
import RemoveAllPunctuation from '@/tools/text-string/remove-all-punctuation';

export default function RemoveAllPunctuationPage() {
  return (
    <>
      <Helmet>
        <title>Remove All Punctuation - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all punctuation marks from your text instantly. Clean text tool for removing commas, periods, and special characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove All Punctuation
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all punctuation marks from your text instantly
          </p>
        </div>
        <RemoveAllPunctuation />
      </div>
    </>
  );
}
