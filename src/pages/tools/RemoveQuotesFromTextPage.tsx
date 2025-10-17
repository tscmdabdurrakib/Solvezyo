import { Helmet } from 'react-helmet';
import RemoveQuotesFromText from '@/tools/text-string/remove-quotes-from-text';

export default function RemoveQuotesFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove Quotes from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove surrounding quotation marks from your text. Strip quotes from the beginning and end of text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove Quotes from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove surrounding quotation marks from your text
          </p>
        </div>
        <RemoveQuotesFromText />
      </div>
    </>
  );
}
