import { Helmet } from 'react-helmet';
import FindTopWordsInText from '@/tools/text-string/find-top-words-in-text';

export default function FindTopWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Find Top Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Analyze word frequency and find the most common words in your text. Perfect for content analysis, SEO research, and text optimization." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Find Top Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze word frequency and find the most common words in your text
          </p>
        </div>
        <FindTopWordsInText />
      </div>
    </>
  );
}