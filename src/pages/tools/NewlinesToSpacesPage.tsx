import { Helmet } from 'react-helmet';
import NewlinesToSpaces from '@/tools/text-string/newlines-to-spaces';

export default function NewlinesToSpacesPage() {
  return (
    <>
      <Helmet>
        <title>Convert Newlines to Spaces - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all newline characters with spaces instantly. Online tool for converting multiline text to single line format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Convert Newlines to Spaces
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all newline characters with spaces for inline text formatting
          </p>
        </div>
        <NewlinesToSpaces />
      </div>
    </>
  );
}
