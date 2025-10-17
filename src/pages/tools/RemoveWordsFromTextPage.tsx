import { Helmet } from 'react-helmet';
import RemoveWordsFromText from '@/tools/text-string/remove-words-from-text';

export default function RemoveWordsFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove Words from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove specific words from your text with options for case sensitivity and whole word matching. Clean up your text content efficiently." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove Words from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove specific words from your text content
          </p>
        </div>
        <RemoveWordsFromText />
      </div>
    </>
  );
}
