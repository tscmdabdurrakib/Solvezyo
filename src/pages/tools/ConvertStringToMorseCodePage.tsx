import { Helmet } from 'react-helmet';
import ConvertStringToMorseCode from '@/tools/text-string/convert-string-to-morse-code';

export default function ConvertStringToMorseCodePage() {
  return (
    <>
      <Helmet>
        <title>Convert String to Morse Code - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to Morse code using dots and dashes. Transform your text to telegraphic Morse code format with real-time conversion." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Convert String to Morse Code
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to Morse code using dots and dashes
          </p>
        </div>
        <ConvertStringToMorseCode />
      </div>
    </>
  );
}
