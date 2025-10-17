import { Helmet } from 'react-helmet';
import RemoveSymbolsFromAroundWords from '@/tools/text-string/remove-symbols-from-around-words';

export default function RemoveSymbolsFromAroundWordsPage() {
  return (
    <>
      <Helmet>
        <title>Remove Symbols from Around Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove specified symbols from around words in your text. Clean up formatted text by removing brackets, quotes, and other symbols." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove Symbols from Around Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove specified symbols from around words in your text
          </p>
        </div>
        <RemoveSymbolsFromAroundWords />
      </div>
    </>
  );
}
