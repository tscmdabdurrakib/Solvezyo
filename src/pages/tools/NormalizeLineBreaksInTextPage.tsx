import { Helmet } from 'react-helmet';
import NormalizeLineBreaksInText from '@/tools/text-string/normalize-line-breaks-in-text';

export default function NormalizeLineBreaksInTextPage() {
  return (
    <>
      <Helmet>
        <title>Normalize Line Breaks in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert all line breaks to a consistent format. Normalize Windows, Mac, and Unix line breaks." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Normalize Line Breaks in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert all line breaks to a consistent format
          </p>
        </div>
        <NormalizeLineBreaksInText />
      </div>
    </>
  );
}
