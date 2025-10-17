import { Helmet } from 'react-helmet';
import ConvertTextToHex from '@/tools/text-string/convert-text-to-hex';

export default function ConvertTextToHexPage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to Hex - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert plain text to hexadecimal representation. Transform text into base-16 format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Convert Text to Hex
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert plain text to hexadecimal representation
          </p>
        </div>
        <ConvertTextToHex />
      </div>
    </>
  );
}
