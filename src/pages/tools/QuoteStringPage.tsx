import { Helmet } from 'react-helmet';
import QuoteString from '@/tools/text-string/quote-string';

export default function QuoteStringPage() {
  return (
    <>
      <Helmet>
        <title>Quote a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add quotes or brackets around each line of your text instantly. Online tool for wrapping text with various quote types and brackets." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Quote a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Add quotes or brackets around each line of your text
          </p>
        </div>
        <QuoteString />
      </div>
    </>
  );
}
