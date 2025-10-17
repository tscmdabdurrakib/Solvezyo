import { Helmet } from 'react-helmet';
import SortSentencesInText from '@/tools/text-string/sort-sentences-in-text';

export default function SortSentencesInTextPage() {
  return (
    <>
      <Helmet>
        <title>Sort Sentences in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Sort sentences within your text alphabetically. Online tool for reorganizing text content and improving readability." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Sort Sentences in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Sort sentences within your text alphabetically
          </p>
        </div>
        <SortSentencesInText />
      </div>
    </>
  );
}