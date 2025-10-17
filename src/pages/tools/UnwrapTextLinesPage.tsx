import { Helmet } from 'react-helmet';
import UnwrapTextLines from '@/tools/text-string/unwrap-text-lines';

export default function UnwrapTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Unwrap Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove line breaks within paragraphs and join text lines with a custom separator. Perfect for unwrapping email text and formatted content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Unwrap Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove line breaks within paragraphs and join text lines with a custom separator
          </p>
        </div>
        <UnwrapTextLines />
      </div>
    </>
  );
}