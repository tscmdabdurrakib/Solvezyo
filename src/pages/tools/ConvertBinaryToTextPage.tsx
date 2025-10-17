import { Helmet } from 'react-helmet';
import ConvertBinaryToText from '@/tools/text-string/convert-binary-to-text';

export default function ConvertBinaryToTextPage() {
  return (
    <>
      <Helmet>
        <title>Convert Binary to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert binary code back to readable text. Decode 8-bit binary strings to plain text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Convert Binary to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert binary code back to readable text
          </p>
        </div>
        <ConvertBinaryToText />
      </div>
    </>
  );
}
