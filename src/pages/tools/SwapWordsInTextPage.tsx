import { Helmet } from 'react-helmet';
import SwapWordsInText from '@/tools/text-string/swap-words-in-text';

export default function SwapWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Swap Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Swap adjacent words within each line while preserving spacing and punctuation. Perfect for text scrambling and word order manipulation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Swap Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Swap adjacent words within each line while preserving spacing
          </p>
        </div>
        <SwapWordsInText />
      </div>
    </>
  );
}
