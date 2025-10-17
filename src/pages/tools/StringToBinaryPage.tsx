import { Helmet } from 'react-helmet';
import StringToBinary from '@/tools/text-string/string-to-binary';

export default function StringToBinaryPage() {
  return (
    <>
      <Helmet>
        <title>Convert a String to Binary - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to binary representation (UTF-8 encoded) instantly. Online tool for encoding text to binary format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
            Convert a String to Binary
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to binary representation (UTF-8 encoded)
          </p>
        </div>
        <StringToBinary />
      </div>
    </>
  );
}
