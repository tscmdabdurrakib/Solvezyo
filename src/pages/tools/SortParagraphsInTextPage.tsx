import { Helmet } from 'react-helmet';
import SortParagraphsInText from '@/tools/text-string/sort-paragraphs-in-text';

export default function SortParagraphsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Sort Paragraphs in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Sort paragraphs alphabetically based on their first line. Online tool for organizing and structuring text content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Sort Paragraphs in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Sort paragraphs alphabetically based on their first line
          </p>
        </div>
        <SortParagraphsInText />
      </div>
    </>
  );
}