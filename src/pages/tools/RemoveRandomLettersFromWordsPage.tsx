import { Helmet } from 'react-helmet';
import RemoveRandomLettersFromWords from '@/tools/text-string/remove-random-letters-from-words';

export default function RemoveRandomLettersFromWordsPage() {
  return (
    <>
      <Helmet>
        <title>Remove Random Letters from Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Randomly remove letters from words while preserving readability. Perfect for text obfuscation and creative text modifications." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove Random Letters from Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Randomly remove letters from words while preserving readability
          </p>
        </div>
        <RemoveRandomLettersFromWords />
      </div>
    </>
  );
}
