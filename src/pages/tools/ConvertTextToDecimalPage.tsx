import { Helmet } from 'react-helmet';
import ConvertTextToDecimal from '@/tools/text-string/convert-text-to-decimal';

export default function ConvertTextToDecimalPage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to Decimal - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert plain text to decimal ASCII values. Transform characters into numeric codes." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Convert Text to Decimal
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert plain text to decimal ASCII values
          </p>
        </div>
        <ConvertTextToDecimal />
      </div>
    </>
  );
}
