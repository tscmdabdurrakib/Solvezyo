import { Helmet } from 'react-helmet';
import SortSymbolsInText from '@/tools/text-string/sort-symbols-in-text';

export default function SortSymbolsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Sort Symbols in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Sort special characters and symbols in your text while preserving text structure. Online tool for text formatting and organization." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Sort Symbols in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Sort special characters and symbols in your text
          </p>
        </div>
        <SortSymbolsInText />
      </div>
    </>
  );
}