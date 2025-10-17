import { Helmet } from 'react-helmet';
import ConvertTextToBinary from '@/tools/text-string/convert-text-to-binary';

export default function ConvertTextToBinaryPage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to Binary - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert plain text to binary code representation. Transform your text into 8-bit binary format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Convert Text to Binary
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert plain text to binary code representation
          </p>
        </div>
        <ConvertTextToBinary />
      </div>
    </>
  );
}
