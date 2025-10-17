import { Helmet } from 'react-helmet';
import ConvertMorseCodeToString from '@/tools/text-string/convert-morse-code-to-string';

export default function ConvertMorseCodeToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert Morse Code to String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Decode Morse code back to readable text. Convert dots and dashes to text with error validation and real-time processing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Convert Morse Code to String
          </h1>
          <p className="text-muted-foreground mt-2">
            Decode Morse code back to readable text
          </p>
        </div>
        <ConvertMorseCodeToString />
      </div>
    </>
  );
}
