import { Helmet } from 'react-helmet';
import ConvertCsvToString from '@/tools/text-string/convert-csv-to-string';

export default function ConvertCsvToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert CSV to String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert CSV data to escaped string format. Transform CSV tables to safe string representation with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            Convert CSV to String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert CSV data to escaped string format
          </p>
        </div>
        <ConvertCsvToString />
      </div>
    </>
  );
}
