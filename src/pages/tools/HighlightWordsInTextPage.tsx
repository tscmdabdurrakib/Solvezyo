import { Helmet } from 'react-helmet';
import HighlightWordsInText from '@/tools/text-string/highlight-words-in-text';

export default function HighlightWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Highlight Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Highlight specific words in your text with customizable colors. Perfect for content analysis and emphasis." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Highlight Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Highlight specific words in your text with customizable colors
          </p>
        </div>
        <HighlightWordsInText />
      </div>
    </>
  );
}