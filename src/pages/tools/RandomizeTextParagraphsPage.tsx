import { Helmet } from 'react-helmet';
import RandomizeTextParagraphs from '@/tools/text-string/randomize-text-paragraphs';

export default function RandomizeTextParagraphsPage() {
  return (
    <>
      <Helmet>
        <title>Randomize Text Paragraphs - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shuffle the order of paragraphs in your text randomly. Perfect for rearranging content, creating varied document structures, and randomizing paragraph order." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Randomize Text Paragraphs
          </h1>
          <p className="text-muted-foreground mt-2">
            Shuffle the order of paragraphs in your text randomly
          </p>
        </div>
        <RandomizeTextParagraphs />
      </div>
    </>
  );
}