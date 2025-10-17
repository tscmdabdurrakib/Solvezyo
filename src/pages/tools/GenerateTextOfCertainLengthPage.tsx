import { Helmet } from 'react-helmet';
import GenerateTextOfCertainLength from '@/tools/text-string/generate-text-of-certain-length';

export default function GenerateTextOfCertainLengthPage() {
  return (
    <>
      <Helmet>
        <title>Generate Text of Certain Length - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Generate text of a specific length using repeating characters. Perfect for testing and creating placeholders." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Generate Text of Certain Length
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate text of a specific length using a repeating character
          </p>
        </div>
        <GenerateTextOfCertainLength />
      </div>
    </>
  );
}
