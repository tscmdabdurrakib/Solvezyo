import { Helmet } from 'react-helmet';
import HighlightPatternsInText from '@/tools/text-string/highlight-patterns-in-text';

export default function HighlightPatternsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Highlight Patterns in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Highlight text patterns using regular expressions. Advanced text analysis and pattern matching tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Highlight Patterns in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Highlight text patterns using regular expressions
          </p>
        </div>
        <HighlightPatternsInText />
      </div>
    </>
  );
}