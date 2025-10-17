import { Helmet } from 'react-helmet';
import FindUniqueWordsInText from '@/tools/text-string/find-unique-words-in-text';

export default function FindUniqueWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Find Unique Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Find words that appear only once in your text. Perfect for vocabulary analysis, content uniqueness checking, and identifying rarely used terms." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Find Unique Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Find words that appear only once in your text
          </p>
        </div>
        <FindUniqueWordsInText />
      </div>
    </>
  );
}