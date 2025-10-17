import { Helmet } from 'react-helmet';
import ConvertStringToCsv from '@/tools/text-string/convert-string-to-csv';

export default function ConvertStringToCsvPage() {
  return (
    <>
      <Helmet>
        <title>Convert String to CSV - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert structured text to CSV format with proper escaping. Transform delimited data to CSV with customizable options." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Convert String to CSV
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert structured text data to CSV format with proper escaping
          </p>
        </div>
        <ConvertStringToCsv />
      </div>
    </>
  );
}
