import { Helmet } from 'react-helmet';
import RandomizeTextLines from '@/tools/text-string/randomize-text-lines';

export default function RandomizeTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Randomize Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shuffle the order of lines in your text randomly. Perfect for randomizing lists, creating varied content, and mixing up sequential data." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Randomize Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Shuffle the order of lines in your text randomly
          </p>
        </div>
        <RandomizeTextLines />
      </div>
    </>
  );
}