import { Helmet } from 'react-helmet';
import ConvertSpacesToNewlines from '@/tools/text-string/convert-spaces-to-newlines';

export default function ConvertSpacesToNewlinesPage() {
  return (
    <>
      <Helmet>
        <title>Convert Spaces to Newlines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all spaces with line breaks in your text. Convert spaces to newlines instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Spaces to Newlines
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all spaces with line breaks in your text
          </p>
        </div>
        <ConvertSpacesToNewlines />
      </div>
    </>
  );
}
