import { Helmet } from 'react-helmet';
import RemoveDiacritics from '@/tools/text-string/remove-diacritics';

export default function RemoveDiacriticsPage() {
  return (
    <>
      <Helmet>
        <title>Remove Diacritics from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove accents and diacritical marks from text. Convert accented characters to plain ASCII text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Remove Diacritics from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove accents and diacritical marks from your text
          </p>
        </div>
        <RemoveDiacritics />
      </div>
    </>
  );
}
