import { Helmet } from 'react-helmet';
import FilterTextLines from '@/tools/text-string/filter-text-lines';

export default function FilterTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Filter Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Filter lines of text based on various criteria including contains, starts with, ends with, regex patterns and more." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Filter Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Filter lines of text based on various criteria
          </p>
        </div>
        <FilterTextLines />
      </div>
    </>
  );
}
