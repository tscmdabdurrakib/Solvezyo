import { Helmet } from 'react-helmet';
import WriteTextInItalic from '@/tools/text-string/write-text-in-italic';

export default function WriteTextInItalicPage() {
  return (
    <>
      <Helmet>
        <title>Write Text in Italic - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to italic Unicode characters. Perfect for stylish text formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Write Text in Italic
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to italic Unicode characters
          </p>
        </div>
        <WriteTextInItalic />
      </div>
    </>
  );
}
