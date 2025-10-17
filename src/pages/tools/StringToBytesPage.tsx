import { Helmet } from 'react-helmet';
import StringToBytes from '@/tools/text-string/string-to-bytes';

export default function StringToBytesPage() {
  return (
    <>
      <Helmet>
        <title>Convert a String to Bytes - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to byte representation in UTF-8, ASCII, hexadecimal, and binary formats instantly. Online string to bytes converter." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Convert a String to Bytes
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to byte representation in various encoding formats
          </p>
        </div>
        <StringToBytes />
      </div>
    </>
  );
}
