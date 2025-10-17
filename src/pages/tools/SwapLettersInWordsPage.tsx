import { Helmet } from 'react-helmet';
import SwapLettersInWords from '@/tools/text-string/swap-letters-in-words';

export default function SwapLettersInWordsPage() {
  return (
    <>
      <Helmet>
        <title>Swap Letters in Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Swap adjacent letters within each word to create a scrambled effect. Perfect for text obfuscation and creative writing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Swap Letters in Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Swap adjacent letters within each word to create a scrambled effect
          </p>
        </div>
        <SwapLettersInWords />
      </div>
    </>
  );
}
