import { Helmet } from 'react-helmet';
import FilterWordsInText from '@/tools/text-string/filter-words-in-text';

export default function FilterWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Filter Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Filter words from your text based on various criteria including contains, length, starts with, ends with and regex patterns." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Filter Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Filter words from your text based on various criteria
          </p>
        </div>
        <FilterWordsInText />
      </div>
    </>
  );
}
