import { Helmet } from 'react-helmet';
import RemoveQuotesFromWords from '@/tools/text-string/remove-quotes-from-words';

export default function RemoveQuotesFromWordsPage() {
  return (
    <>
      <Helmet>
        <title>Remove Quotes from Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all quotation marks from your text. Strip quotes from individual words." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove Quotes from Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all quotation marks from your text
          </p>
        </div>
        <RemoveQuotesFromWords />
      </div>
    </>
  );
}
