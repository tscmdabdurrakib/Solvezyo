import { Helmet } from 'react-helmet';
import RemovePrefixFromWords from '@/tools/text-string/remove-prefix-from-words';

export default function RemovePrefixFromWordsPage() {
  return (
    <>
      <Helmet>
        <title>Remove Prefix from Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove a specified prefix from all words in your text with options for case sensitivity. Clean up your text content efficiently." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Remove Prefix from Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove a specified prefix from all words in your text
          </p>
        </div>
        <RemovePrefixFromWords />
      </div>
    </>
  );
}
