import { Helmet } from 'react-helmet';
import RemoveQuotesFromLines from '@/tools/text-string/remove-quotes-from-lines';

export default function RemoveQuotesFromLinesPage() {
  return (
    <>
      <Helmet>
        <title>Remove Quotes from Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove quotation marks from each line of your text. Strip quotes from multi-line text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove Quotes from Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove quotation marks from each line of your text
          </p>
        </div>
        <RemoveQuotesFromLines />
      </div>
    </>
  );
}
