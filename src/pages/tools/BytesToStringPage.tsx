import { Helmet } from 'react-helmet';
import BytesToString from '@/tools/text-string/bytes-to-string';

export default function BytesToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert Bytes to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert byte representation back to readable text from UTF-8, ASCII, hexadecimal, and binary formats instantly. Online bytes to string converter." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Convert Bytes to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert byte representation back to readable text in various formats
          </p>
        </div>
        <BytesToString />
      </div>
    </>
  );
}
