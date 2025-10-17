import { Helmet } from 'react-helmet';
import RandomizeLetterCase from '@/tools/text-string/randomize-letter-case';

export default function RandomizeLetterCasePage() {
  return (
    <>
      <Helmet>
        <title>Randomize Letter Case - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Randomly convert letters to uppercase or lowercase. Generate unique text variations with our free online letter case randomizer tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Randomize Letter Case
          </h1>
          <p className="text-muted-foreground mt-2">
            Randomly convert letters to uppercase or lowercase
          </p>
        </div>
        <RandomizeLetterCase />
      </div>
    </>
  );
}
