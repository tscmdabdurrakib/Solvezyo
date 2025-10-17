import { Helmet } from 'react-helmet';
import ConvertMorseCodeToText from '@/tools/text-string/convert-morse-code-to-text';

export default function ConvertMorseCodeToTextPage() {
  return (
    <>
      <Helmet>
        <title>Convert Morse Code to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Decode Morse code into readable text instantly. Perfect for learning and decoding Morse messages." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Morse Code to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Decode Morse code into readable text instantly
          </p>
        </div>
        <ConvertMorseCodeToText />
      </div>
    </>
  );
}
