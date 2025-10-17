import { Helmet } from 'react-helmet';
import RemoveEmptyLines from '@/tools/text-string/remove-empty-lines';

export default function RemoveEmptyLinesPage() {
  return (
    <>
      <Helmet>
        <title>Remove All Empty Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all empty lines from your text instantly. Online tool for cleaning up text and removing unnecessary line breaks." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Remove All Empty Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all empty lines from your text while preserving content
          </p>
        </div>
        <RemoveEmptyLines />
      </div>
    </>
  );
}
