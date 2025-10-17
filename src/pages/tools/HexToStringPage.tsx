import { Helmet } from 'react-helmet';
import HexToString from '@/tools/text-string/hex-to-string';

export default function HexToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert Hex to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert hexadecimal representation back to readable text instantly. Online tool for decoding hex to text format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Convert Hex to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert hexadecimal representation back to readable text
          </p>
        </div>
        <HexToString />
      </div>
    </>
  );
}
