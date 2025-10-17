import { Helmet } from 'react-helmet';
import GenerateTinyText from '@/tools/text-string/generate-tiny-text';

export default function GenerateTinyTextPage() {
  return (
    <>
      <Helmet>
        <title>Generate Tiny Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to small caps Unicode characters. Perfect for social media and unique styling." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Generate Tiny Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to small caps Unicode characters
          </p>
        </div>
        <GenerateTinyText />
      </div>
    </>
  );
}