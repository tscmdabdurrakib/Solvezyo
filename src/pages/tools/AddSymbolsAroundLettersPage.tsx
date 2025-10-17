import { Helmet } from 'react-helmet';
import AddSymbolsAroundLetters from '@/tools/text-string/add-symbols-around-letters';

export default function AddSymbolsAroundLettersPage() {
  return (
    <>
      <Helmet>
        <title>Add Symbols Around Letters - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Wrap each letter in your text with custom symbols for stylistic formatting and text decoration purposes." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Add Symbols Around Letters
          </h1>
          <p className="text-muted-foreground mt-2">
            Wrap each letter in your text with custom symbols
          </p>
        </div>
        <AddSymbolsAroundLetters />
      </div>
    </>
  );
}
