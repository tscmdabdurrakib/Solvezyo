import { Helmet } from 'react-helmet';
import SortWordsInText from '@/tools/text-string/sort-words-in-text';

export default function SortWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Sort Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Sort all words in your text alphabetically with various options. Online tool for text organization and word arrangement." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Sort Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Sort all words in your text alphabetically
          </p>
        </div>
        <SortWordsInText />
      </div>
    </>
  );
}