import { Helmet } from 'react-helmet';
import RemoveAllEmptyLines from '@/tools/text-string/remove-all-empty-lines';

export default function RemoveAllEmptyLinesPage() {
  return (
    <>
      <Helmet>
        <title>Remove All Empty Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all empty lines from your text content to clean up formatting and improve readability." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Remove All Empty Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all empty lines from your text content
          </p>
        </div>
        <RemoveAllEmptyLines />
      </div>
    </>
  );
}
