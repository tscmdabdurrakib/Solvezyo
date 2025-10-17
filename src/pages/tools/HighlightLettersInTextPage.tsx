import { Helmet } from 'react-helmet';
import HighlightLettersInText from '@/tools/text-string/highlight-letters-in-text';

export default function HighlightLettersInTextPage() {
  return (
    <>
      <Helmet>
        <title>Highlight Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Highlight specific letters in your text with customizable colors. Perfect for text analysis and emphasis." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Highlight Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Highlight specific letters in your text with customizable colors
          </p>
        </div>
        <HighlightLettersInText />
      </div>
    </>
  );
}