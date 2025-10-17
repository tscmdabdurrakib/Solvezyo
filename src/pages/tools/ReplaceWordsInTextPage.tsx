import { Helmet } from 'react-helmet';
import ReplaceWordsInText from '@/tools/text-string/replace-words-in-text';

export default function ReplaceWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Replace Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Find and replace words in your text with options for case sensitivity and whole word matching. Perfect for bulk text editing and content updates." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Replace Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Find and replace words in your text content
          </p>
        </div>
        <ReplaceWordsInText />
      </div>
    </>
  );
}
