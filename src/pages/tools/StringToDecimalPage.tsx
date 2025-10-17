import { Helmet } from 'react-helmet';
import StringToDecimal from '@/tools/text-string/string-to-decimal';

export default function StringToDecimalPage() {
  return (
    <>
      <Helmet>
        <title>Convert a String to Decimal - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to decimal representation (base-10) instantly. Online tool for encoding text to decimal format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Convert a String to Decimal
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to decimal representation (base-10)
          </p>
        </div>
        <StringToDecimal />
      </div>
    </>
  );
}
