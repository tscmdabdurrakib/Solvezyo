import { Helmet } from 'react-helmet';
import FindTopLettersInText from '@/tools/text-string/find-top-letters-in-text';

export default function FindTopLettersInTextPage() {
  return (
    <>
      <Helmet>
        <title>Find Top Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Analyze character frequency and find the most common letters in your text. Perfect for cryptography, linguistics, and text analysis." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Find Top Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze character frequency and find the most common letters in your text
          </p>
        </div>
        <FindTopLettersInText />
      </div>
    </>
  );
}