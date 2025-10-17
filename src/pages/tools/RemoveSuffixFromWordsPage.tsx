import { Helmet } from 'react-helmet';
import RemoveSuffixFromWords from '@/tools/text-string/remove-suffix-from-words';

export default function RemoveSuffixFromWordsPage() {
  return (
    <>
      <Helmet>
        <title>Remove Suffix from Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove a specified suffix from all words in your text with options for case sensitivity. Clean up your text content efficiently." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Remove Suffix from Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove a specified suffix from all words in your text
          </p>
        </div>
        <RemoveSuffixFromWords />
      </div>
    </>
  );
}
