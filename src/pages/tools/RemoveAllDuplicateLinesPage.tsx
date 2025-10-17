import { Helmet } from 'react-helmet';
import RemoveAllDuplicateLines from '@/tools/text-string/remove-all-duplicate-lines';

export default function RemoveAllDuplicateLinesPage() {
  return (
    <>
      <Helmet>
        <title>Remove All Duplicate Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove duplicate lines from your text while preserving order and maintaining unique content only." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Remove All Duplicate Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove duplicate lines from your text while preserving order
          </p>
        </div>
        <RemoveAllDuplicateLines />
      </div>
    </>
  );
}
