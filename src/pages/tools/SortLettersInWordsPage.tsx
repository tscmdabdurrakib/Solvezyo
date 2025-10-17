import { Helmet } from 'react-helmet';
import SortLettersInWords from '@/tools/text-string/sort-letters-in-words';

export default function SortLettersInWordsPage() {
  return (
    <>
      <Helmet>
        <title>Sort Letters in Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Sort letters alphabetically within each word while preserving word boundaries. Online tool for text manipulation and formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            Sort Letters in Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Sort letters alphabetically within each word
          </p>
        </div>
        <SortLettersInWords />
      </div>
    </>
  );
}