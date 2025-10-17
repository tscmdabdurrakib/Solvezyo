import { Helmet } from 'react-helmet';
import SortTextLines from '@/tools/text-string/sort-text-lines';

export default function SortTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Sort Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Sort text lines alphabetically in ascending or descending order. Online tool for organizing and arranging text content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Sort Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Sort text lines alphabetically in ascending or descending order
          </p>
        </div>
        <SortTextLines />
      </div>
    </>
  );
}