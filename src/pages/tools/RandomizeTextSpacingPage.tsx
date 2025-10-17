import { Helmet } from 'react-helmet';
import RandomizeTextSpacing from '@/tools/text-string/randomize-text-spacing';

export default function RandomizeTextSpacingPage() {
  return (
    <>
      <Helmet>
        <title>Randomize Text Spacing - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add random spacing between words for creative effects. Generate unique text layouts instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Randomize Text Spacing
          </h1>
          <p className="text-muted-foreground mt-2">
            Add random spacing between words for creative effects
          </p>
        </div>
        <RandomizeTextSpacing />
      </div>
    </>
  );
}
