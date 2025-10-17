import { Helmet } from 'react-helmet';
import DecimalToString from '@/tools/text-string/decimal-to-string';

export default function DecimalToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert Decimal to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert decimal representation back to readable text instantly. Online tool for decoding decimal to text format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Convert Decimal to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert decimal representation back to readable text
          </p>
        </div>
        <DecimalToString />
      </div>
    </>
  );
}
