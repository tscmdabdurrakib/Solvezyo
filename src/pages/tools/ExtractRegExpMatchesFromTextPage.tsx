import { Helmet } from 'react-helmet';
import ExtractRegExpMatchesFromText from '@/tools/text-string/extract-regexp-matches-from-text';

export default function ExtractRegExpMatchesFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Extract RegExp Matches from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Extract all text that matches a regular expression pattern. Find emails, phone numbers, URLs and more." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Extract RegExp Matches from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Extract all text that matches a regular expression pattern
          </p>
        </div>
        <ExtractRegExpMatchesFromText />
      </div>
    </>
  );
}
