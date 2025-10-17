import { Helmet } from 'react-helmet';
import IncreaseTextSpacing from '@/tools/text-string/increase-text-spacing';

export default function IncreaseTextSpacingPage() {
  return (
    <>
      <Helmet>
        <title>Increase Text Spacing - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add more spaces between words for better readability. Customize spacing width easily." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Increase Text Spacing
          </h1>
          <p className="text-muted-foreground mt-2">
            Add more spaces between words for better readability
          </p>
        </div>
        <IncreaseTextSpacing />
      </div>
    </>
  );
}
