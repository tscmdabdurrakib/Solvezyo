import { Helmet } from 'react-helmet';
import GenerateZalgoText from '@/tools/text-string/generate-zalgo-text';

export default function GenerateZalgoTextPage() {
  return (
    <>
      <Helmet>
        <title>Generate Zalgo Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Create spooky, corrupted text with Unicode combining characters. Perfect for Halloween and horror themes." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Generate Zalgo Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Create spooky, corrupted text with Unicode combining characters
          </p>
        </div>
        <GenerateZalgoText />
      </div>
    </>
  );
}