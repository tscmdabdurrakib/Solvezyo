import { Helmet } from 'react-helmet';
import CountWordsInText from '@/tools/text-string/count-words-in-text';

export default function CountWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Count Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Count and analyze words in your text with detailed statistics including unique words, word lengths, and reading metrics." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Count Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Count and analyze words in your text with detailed statistics
          </p>
        </div>
        <CountWordsInText />
      </div>
    </>
  );
}