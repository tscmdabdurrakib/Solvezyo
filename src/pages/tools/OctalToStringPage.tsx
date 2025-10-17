import { Helmet } from 'react-helmet';
import OctalToString from '@/tools/text-string/octal-to-string';

export default function OctalToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert Octal to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert octal representation back to readable text instantly. Online tool for decoding octal to text format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Convert Octal to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert octal representation back to readable text
          </p>
        </div>
        <OctalToString />
      </div>
    </>
  );
}
