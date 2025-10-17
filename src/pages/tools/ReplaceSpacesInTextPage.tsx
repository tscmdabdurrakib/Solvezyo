import { Helmet } from 'react-helmet';
import ReplaceSpacesInText from '@/tools/text-string/replace-spaces-in-text';

export default function ReplaceSpacesInTextPage() {
  return (
    <>
      <Helmet>
        <title>Replace Spaces in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all spaces with custom characters or text. Flexible spacing replacement tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Replace Spaces in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all spaces with your custom character or text
          </p>
        </div>
        <ReplaceSpacesInText />
      </div>
    </>
  );
}
