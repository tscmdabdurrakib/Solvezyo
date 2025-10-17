import { Helmet } from 'react-helmet';
import ExtractTextFromJSON from '@/tools/text-string/extract-text-from-json';

export default function ExtractTextFromJSONPage() {
  return (
    <>
      <Helmet>
        <title>Extract Text from JSON - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Extract all text values from JSON data recursively." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Extract Text from JSON
          </h1>
          <p className="text-muted-foreground mt-2">
            Extract all text values from JSON data
          </p>
        </div>
        <ExtractTextFromJSON />
      </div>
    </>
  );
}
