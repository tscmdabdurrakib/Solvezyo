import { Helmet } from 'react-helmet';
import StringToHex from '@/tools/text-string/string-to-hex';

export default function StringToHexPage() {
  return (
    <>
      <Helmet>
        <title>Convert a String to Hex - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to hexadecimal representation (base-16) instantly. Online tool for encoding text to hex format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Convert a String to Hex
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to hexadecimal representation (base-16)
          </p>
        </div>
        <StringToHex />
      </div>
    </>
  );
}
