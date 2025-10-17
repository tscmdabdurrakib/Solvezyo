import { Helmet } from 'react-helmet';
import FilterTextParagraphs from '@/tools/text-string/filter-text-paragraphs';

export default function FilterTextParagraphsPage() {
  return (
    <>
      <Helmet>
        <title>Filter Text Paragraphs - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Filter paragraphs from your text based on keywords and conditions. Online tool for text processing and content filtering." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Filter Text Paragraphs
          </h1>
          <p className="text-muted-foreground mt-2">
            Filter paragraphs based on keywords and conditions
          </p>
        </div>
        <FilterTextParagraphs />
      </div>
    </>
  );
}