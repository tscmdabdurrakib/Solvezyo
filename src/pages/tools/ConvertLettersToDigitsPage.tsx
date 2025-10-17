import { Helmet } from 'react-helmet';
import ConvertLettersToDigits from '@/tools/text-string/convert-letters-to-digits';

export default function ConvertLettersToDigitsPage() {
  return (
    <>
      <Helmet>
        <title>Convert Letters to Digits - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform letters to their numerical lookalikes. Perfect for creating digital-style text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Convert Letters to Digits
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform letters to their numerical lookalikes
          </p>
        </div>
        <ConvertLettersToDigits />
      </div>
    </>
  );
}
