import { Helmet } from 'react-helmet';
import EraseLettersFromWords from '@/tools/text-string/erase-letters-from-words';

export default function EraseLettersFromWordsPage() {
  return (
    <>
      <Helmet>
        <title>Erase Letters from Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove specific letters from your text and words. Clean and customize your text by erasing unwanted characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Erase Letters from Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove specific letters from your text and words
          </p>
        </div>
        <EraseLettersFromWords />
      </div>
    </>
  );
}