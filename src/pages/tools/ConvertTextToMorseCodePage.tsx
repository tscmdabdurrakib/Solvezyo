import { Helmet } from 'react-helmet';
import ConvertTextToMorseCode from '@/tools/text-string/convert-text-to-morse-code';

export default function ConvertTextToMorseCodePage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to Morse Code - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to Morse code instantly. Perfect for learning Morse code and emergency communication." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Text to Morse Code
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform your text into Morse code instantly
          </p>
        </div>
        <ConvertTextToMorseCode />
      </div>
    </>
  );
}
