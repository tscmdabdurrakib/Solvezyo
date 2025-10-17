import { Helmet } from 'react-helmet';
import CalculateLetterSum from '@/tools/text-string/calculate-letter-sum';

export default function CalculateLetterSumPage() {
  return (
    <>
      <Helmet>
        <title>Calculate Letter Sum - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Calculate the sum of letter values in your text using ASCII, alphabetical position, or Unicode methods. Perfect for checksums and text analysis." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Calculate Letter Sum
          </h1>
          <p className="text-muted-foreground mt-2">
            Calculate the sum of letter values in your text using different methods
          </p>
        </div>
        <CalculateLetterSum />
      </div>
    </>
  );
}