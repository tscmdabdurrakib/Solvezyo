import { Helmet } from 'react-helmet';
import ExtractTextFromBBCode from '@/tools/text-string/extract-text-from-bbcode';

export default function ExtractTextFromBBCodePage() {
  return (
    <>
      <Helmet>
        <title>Extract Text from BBCode - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all BBCode formatting and extract plain text from forum posts." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Extract Text from BBCode
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all BBCode formatting and extract plain text
          </p>
        </div>
        <ExtractTextFromBBCode />
      </div>
    </>
  );
}
