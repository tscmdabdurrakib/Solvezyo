import { Helmet } from 'react-helmet';
import GenerateFakeText from '@/tools/text-string/generate-fake-text';

export default function GenerateFakeTextPage() {
  return (
    <>
      <Helmet>
        <title>Generate Fake Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Generate placeholder text in various styles including Lorem Ipsum, random words, and custom patterns. Perfect for design mockups and testing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Generate Fake Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate placeholder text in various styles
          </p>
        </div>
        <GenerateFakeText />
      </div>
    </>
  );
}
