import { Helmet } from 'react-helmet';
import CalculateTextEntropy from '@/tools/text-string/calculate-text-entropy';

export default function CalculateTextEntropyPage() {
  return (
    <>
      <Helmet>
        <title>Calculate Text Entropy - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Measure the randomness and information content of your text using Shannon entropy. Perfect for cryptography, data compression analysis, and text complexity assessment." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Calculate Text Entropy
          </h1>
          <p className="text-muted-foreground mt-2">
            Measure the randomness and information content of your text using Shannon entropy
          </p>
        </div>
        <CalculateTextEntropy />
      </div>
    </>
  );
}