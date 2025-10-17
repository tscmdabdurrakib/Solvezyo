import { Helmet } from 'react-helmet';
import FixDistanceBetweenParagraphsAndLines from '@/tools/text-string/fix-distance-between-paragraphs-and-lines';

export default function FixDistanceBetweenParagraphsAndLinesPage() {
  return (
    <>
      <Helmet>
        <title>Fix Distance Between Paragraphs and Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Adjust spacing between lines and paragraphs in your text. Control line and paragraph distances easily." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Fix Distance Between Paragraphs and Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Adjust spacing between lines and paragraphs in your text
          </p>
        </div>
        <FixDistanceBetweenParagraphsAndLines />
      </div>
    </>
  );
}
