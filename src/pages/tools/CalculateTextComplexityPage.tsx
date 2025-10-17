import { Helmet } from 'react-helmet';
import CalculateTextComplexity from '@/tools/text-string/calculate-text-complexity';

export default function CalculateTextComplexityPage() {
  return (
    <>
      <Helmet>
        <title>Calculate Text Complexity - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Analyze readability and complexity metrics of your text. Perfect for content optimization and SEO." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Calculate Text Complexity
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze readability and complexity metrics of your text
          </p>
        </div>
        <CalculateTextComplexity />
      </div>
    </>
  );
}
