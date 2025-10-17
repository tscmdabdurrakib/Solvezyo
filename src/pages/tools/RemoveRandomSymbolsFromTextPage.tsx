import { Helmet } from 'react-helmet';
import RemoveRandomSymbolsFromText from '@/tools/text-string/remove-random-symbols-from-text';

export default function RemoveRandomSymbolsFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove Random Symbols from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Randomly remove specified symbols from your text with customizable probability settings. Clean up text content efficiently." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove Random Symbols from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Randomly remove specified symbols from your text
          </p>
        </div>
        <RemoveRandomSymbolsFromText />
      </div>
    </>
  );
}
