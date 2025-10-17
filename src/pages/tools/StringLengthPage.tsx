import { Helmet } from 'react-helmet';
import StringLength from '@/tools/text-string/string-length';

export default function StringLengthPage() {
  return (
    <>
      <Helmet>
        <title>Find the Length of a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Calculate character count, word count, and byte size of text instantly. Online string length calculator with detailed metrics." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Find the Length of a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Calculate character count, word count, and byte size of your text
          </p>
        </div>
        <StringLength />
      </div>
    </>
  );
}
