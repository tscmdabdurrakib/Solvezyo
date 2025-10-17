import { Helmet } from 'react-helmet';
import ReverseParagraphsInText from '@/tools/text-string/reverse-paragraphs-in-text';

export default function ReverseParagraphsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Reverse Paragraphs in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Reverse the order of paragraphs in your text while preserving paragraph content. Perfect for reordering document sections." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Reverse Paragraphs in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Reverse the order of paragraphs in your text
          </p>
        </div>
        <ReverseParagraphsInText />
      </div>
    </>
  );
}
