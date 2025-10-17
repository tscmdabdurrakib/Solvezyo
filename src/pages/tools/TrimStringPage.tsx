import { Helmet } from 'react-helmet';
import TrimString from '@/tools/text-string/trim-string';

export default function TrimStringPage() {
  return (
    <>
      <Helmet>
        <title>Trim a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove whitespace from text with various trim options. Online tool to trim strings from start, end, or remove all extra spaces." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Trim a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove whitespace from text with various trim options
          </p>
        </div>
        <TrimString />
      </div>
    </>
  );
}
