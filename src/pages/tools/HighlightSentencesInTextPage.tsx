import { Helmet } from 'react-helmet';
import HighlightSentencesInText from '@/tools/text-string/highlight-sentences-in-text';

export default function HighlightSentencesInTextPage() {
  return (
    <>
      <Helmet>
        <title>Highlight Sentences in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Highlight individual sentences in your text. Perfect for text analysis and sentence structure visualization." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Highlight Sentences in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Highlight individual sentences in your text
          </p>
        </div>
        <HighlightSentencesInText />
      </div>
    </>
  );
}