import { Helmet } from 'react-helmet';
import ConvertDecimalToText from '@/tools/text-string/convert-decimal-to-text';

export default function ConvertDecimalToTextPage() {
  return (
    <>
      <Helmet>
        <title>Convert Decimal to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert decimal ASCII values back to readable text. Decode numeric codes to characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Convert Decimal to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert decimal ASCII values back to readable text
          </p>
        </div>
        <ConvertDecimalToText />
      </div>
    </>
  );
}
