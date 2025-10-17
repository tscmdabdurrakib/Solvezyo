import { Helmet } from 'react-helmet';
import ConvertHexToText from '@/tools/text-string/convert-hex-to-text';

export default function ConvertHexToTextPage() {
  return (
    <>
      <Helmet>
        <title>Convert Hex to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert hexadecimal code back to readable text. Decode base-16 format to plain text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
            Convert Hex to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert hexadecimal code back to readable text
          </p>
        </div>
        <ConvertHexToText />
      </div>
    </>
  );
}
