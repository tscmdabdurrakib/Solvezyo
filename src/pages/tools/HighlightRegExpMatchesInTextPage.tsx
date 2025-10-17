import { Helmet } from 'react-helmet';
import HighlightRegExpMatchesInText from '@/tools/text-string/highlight-regexp-matches-in-text';

export default function HighlightRegExpMatchesInTextPage() {
  return (
    <>
      <Helmet>
        <title>Highlight RegExp Matches in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Visually highlight all text that matches a regular expression pattern. Great for debugging regex patterns." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Highlight RegExp Matches in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Visually highlight all text that matches a regular expression pattern
          </p>
        </div>
        <HighlightRegExpMatchesInText />
      </div>
    </>
  );
}
