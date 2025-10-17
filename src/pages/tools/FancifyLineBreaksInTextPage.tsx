import { Helmet } from 'react-helmet';
import FancifyLineBreaksInText from '@/tools/text-string/fancify-line-breaks-in-text';

export default function FancifyLineBreaksInTextPage() {
  return (
    <>
      <Helmet>
        <title>Fancify Line Breaks in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add decorative separators between lines in your text. Make your text more visually appealing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Fancify Line Breaks in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Add decorative separators between lines in your text
          </p>
        </div>
        <FancifyLineBreaksInText />
      </div>
    </>
  );
}
