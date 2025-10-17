import { Helmet } from 'react-helmet';
import RandomizeLettersInText from '@/tools/text-string/randomize-letters-in-text';

export default function RandomizeLettersInTextPage() {
  return (
    <>
      <Helmet>
        <title>Randomize Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Randomly shuffle letters in your text with various preservation options. Online tool for text scrambling and randomization." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Randomize Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Randomly shuffle letters in your text with various options
          </p>
        </div>
        <RandomizeLettersInText />
      </div>
    </>
  );
}