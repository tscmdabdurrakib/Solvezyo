import { Helmet } from 'react-helmet';
import ConvertCommasToSpaces from '@/tools/text-string/convert-commas-to-spaces';

export default function ConvertCommasToSpacesPage() {
  return (
    <>
      <Helmet>
        <title>Convert Commas to Spaces - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all commas with spaces instantly. Perfect for text formatting and data transformation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Commas to Spaces
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all commas with spaces instantly
          </p>
        </div>
        <ConvertCommasToSpaces />
      </div>
    </>
  );
}
