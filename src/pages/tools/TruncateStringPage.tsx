import { Helmet } from 'react-helmet';
import TruncateString from '@/tools/text-string/truncate-string';

export default function TruncateStringPage() {
  return (
    <>
      <Helmet>
        <title>Truncate a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shorten text to a specified length with optional ellipsis. Online tool to truncate strings with customizable character limits." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Truncate a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Shorten text to a specified length with optional ellipsis
          </p>
        </div>
        <TruncateString />
      </div>
    </>
  );
}
