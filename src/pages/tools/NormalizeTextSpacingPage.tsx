import { Helmet } from 'react-helmet';
import NormalizeTextSpacing from '@/tools/text-string/normalize-text-spacing';

export default function NormalizeTextSpacingPage() {
  return (
    <>
      <Helmet>
        <title>Normalize Text Spacing - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Standardize all spacing to single spaces. Perfect for cleaning up inconsistent text formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Normalize Text Spacing
          </h1>
          <p className="text-muted-foreground mt-2">
            Standardize all spacing to single spaces throughout the text
          </p>
        </div>
        <NormalizeTextSpacing />
      </div>
    </>
  );
}
