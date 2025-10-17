import { Helmet } from 'react-helmet';
import WriteTextInBold from '@/tools/text-string/write-text-in-bold';

export default function WriteTextInBoldPage() {
  return (
    <>
      <Helmet>
        <title>Write Text in Bold - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to bold Unicode characters. Perfect for emphasis and making text stand out." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Write Text in Bold
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to bold Unicode characters
          </p>
        </div>
        <WriteTextInBold />
      </div>
    </>
  );
}