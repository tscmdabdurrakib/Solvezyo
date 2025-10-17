import { Helmet } from 'react-helmet';
import StringToOctal from '@/tools/text-string/string-to-octal';

export default function StringToOctalPage() {
  return (
    <>
      <Helmet>
        <title>Convert a String to Octal - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to octal representation (base-8) instantly. Online tool for encoding text to octal format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Convert a String to Octal
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to octal representation (base-8)
          </p>
        </div>
        <StringToOctal />
      </div>
    </>
  );
}
