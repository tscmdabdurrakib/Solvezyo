import { Helmet } from 'react-helmet';
import ExtractTextFragment from '@/tools/text-string/extract-text-fragment';

export default function ExtractTextFragmentPage() {
  return (
    <>
      <Helmet>
        <title>Extract Text Fragment - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Extract a specific portion of text by character position or word range. Perfect for text sampling, content analysis, and substring extraction." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Extract Text Fragment
          </h1>
          <p className="text-muted-foreground mt-2">
            Extract a specific portion of text by character position or word range
          </p>
        </div>
        <ExtractTextFragment />
      </div>
    </>
  );
}