import { Helmet } from 'react-helmet';
import AsciiToString from '@/tools/text-string/ascii-to-string';

export default function AsciiToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert ASCII to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert ASCII code values back to readable text instantly. Online tool for decoding ASCII to text format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            Convert ASCII to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert ASCII code values back to readable text
          </p>
        </div>
        <AsciiToString />
      </div>
    </>
  );
}
