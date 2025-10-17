import { Helmet } from 'react-helmet';
import ConvertTextToOctal from '@/tools/text-string/convert-text-to-octal';

export default function ConvertTextToOctalPage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to Octal - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert plain text to octal code representation. Transform text into base-8 number system." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Convert Text to Octal
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert plain text to octal code representation
          </p>
        </div>
        <ConvertTextToOctal />
      </div>
    </>
  );
}
