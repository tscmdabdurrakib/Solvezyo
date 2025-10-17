import { Helmet } from 'react-helmet';
import RemoveLettersFromText from '@/tools/text-string/remove-letters-from-text';

export default function RemoveLettersFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove Letters from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove specific letters or characters from your text. Perfect for text cleaning and customization." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
            Remove Letters from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove specific letters or characters from your text
          </p>
        </div>
        <RemoveLettersFromText />
      </div>
    </>
  );
}
