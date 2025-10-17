import { Helmet } from 'react-helmet';
import ConvertOctalToText from '@/tools/text-string/convert-octal-to-text';

export default function ConvertOctalToTextPage() {
  return (
    <>
      <Helmet>
        <title>Convert Octal to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert octal code back to readable text. Decode base-8 numbers to plain text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Convert Octal to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert octal code back to readable text
          </p>
        </div>
        <ConvertOctalToText />
      </div>
    </>
  );
}
