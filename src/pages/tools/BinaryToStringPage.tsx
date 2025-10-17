import { Helmet } from 'react-helmet';
import BinaryToString from '@/tools/text-string/binary-to-string';

export default function BinaryToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert Binary to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert binary representation back to readable text instantly. Online tool for decoding binary to text format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-zinc-600 to-stone-600 bg-clip-text text-transparent">
            Convert Binary to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert binary representation back to readable text
          </p>
        </div>
        <BinaryToString />
      </div>
    </>
  );
}
