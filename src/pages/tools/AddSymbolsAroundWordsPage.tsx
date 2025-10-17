import { Helmet } from 'react-helmet';
import AddSymbolsAroundWords from '@/tools/text-string/add-symbols-around-words';

export default function AddSymbolsAroundWordsPage() {
  return (
    <>
      <Helmet>
        <title>Add Symbols Around Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Wrap each word with custom symbols or brackets. Choose from preset options or create your own symbol combinations." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add Symbols Around Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Wrap each word with custom symbols or brackets
          </p>
        </div>
        <AddSymbolsAroundWords />
      </div>
    </>
  );
}
