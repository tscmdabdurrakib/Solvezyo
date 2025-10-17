import { Helmet } from 'react-helmet';
import RemoveSuffixFromTextLines from '@/tools/text-string/remove-suffix-from-text-lines';

export default function RemoveSuffixFromTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Remove a Suffix from Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove a specific suffix from the end of lines in your text. Clean up formatted text by removing trailing punctuation and symbols." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove a Suffix from Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove a specific suffix from the end of lines in your text
          </p>
        </div>
        <RemoveSuffixFromTextLines />
      </div>
    </>
  );
}
