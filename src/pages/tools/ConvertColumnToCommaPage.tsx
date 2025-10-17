import { Helmet } from 'react-helmet';
import ConvertColumnToComma from '@/tools/text-string/convert-column-to-comma';

export default function ConvertColumnToCommaPage() {
  return (
    <>
      <Helmet>
        <title>Convert Column to Comma - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert columnar data to comma-separated format. Transform column format to CSV instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Column to Comma
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert columnar data to comma-separated format
          </p>
        </div>
        <ConvertColumnToComma />
      </div>
    </>
  );
}
