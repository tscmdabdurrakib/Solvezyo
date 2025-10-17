import { Helmet } from 'react-helmet';
import RemoveExtraSpaces from '@/tools/text-string/remove-extra-spaces';

export default function RemoveExtraSpacesPage() {
  return (
    <>
      <Helmet>
        <title>Remove Extra Spaces - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all extra whitespace and normalize spacing. Clean up text formatting instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove Extra Spaces
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all extra whitespace and normalize spacing
          </p>
        </div>
        <RemoveExtraSpaces />
      </div>
    </>
  );
}
