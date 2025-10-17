import { Helmet } from 'react-helmet';
import FilterTextSentences from '@/tools/text-string/filter-text-sentences';

export default function FilterTextSentencesPage() {
  return (
    <>
      <Helmet>
        <title>Filter Text Sentences - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Filter sentences from your text based on various criteria including word count, length, contains patterns and regex matching." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Filter Text Sentences
          </h1>
          <p className="text-muted-foreground mt-2">
            Filter sentences from your text based on various criteria
          </p>
        </div>
        <FilterTextSentences />
      </div>
    </>
  );
}
