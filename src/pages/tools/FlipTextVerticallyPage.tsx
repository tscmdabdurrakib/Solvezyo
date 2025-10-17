import { Helmet } from 'react-helmet';
import FlipTextVertically from '@/tools/text-string/flip-text-vertically';

export default function FlipTextVerticallyPage() {
  return (
    <>
      <Helmet>
        <title>Flip Text Vertically - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Flip your text upside down for creative effects. Perfect for unique text formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Flip Text Vertically
          </h1>
          <p className="text-muted-foreground mt-2">
            Flip your text upside down for creative effects
          </p>
        </div>
        <FlipTextVertically />
      </div>
    </>
  );
}
