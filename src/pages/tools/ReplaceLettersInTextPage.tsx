import { Helmet } from 'react-helmet';
import ReplaceLettersInText from '@/tools/text-string/replace-letters-in-text';

export default function ReplaceLettersInTextPage() {
  return (
    <>
      <Helmet>
        <title>Replace Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Find and replace specific letters or characters in your text. Perfect for text customization." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Replace Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Find and replace specific letters or characters in your text
          </p>
        </div>
        <ReplaceLettersInText />
      </div>
    </>
  );
}
