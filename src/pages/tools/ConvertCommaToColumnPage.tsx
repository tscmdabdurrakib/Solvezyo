import { Helmet } from 'react-helmet';
import ConvertCommaToColumn from '@/tools/text-string/convert-comma-to-column';

export default function ConvertCommaToColumnPage() {
  return (
    <>
      <Helmet>
        <title>Convert Comma to Column - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert comma-separated values to column format. Transform CSV data into line-by-line format instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Comma to Column
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert comma-separated values to column format
          </p>
        </div>
        <ConvertCommaToColumn />
      </div>
    </>
  );
}
