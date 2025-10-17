import { Helmet } from 'react-helmet';
import EraseWordsFromText from '@/tools/text-string/erase-words-from-text';

export default function EraseWordsFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Erase Words from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove specific words from your text. Clean and filter your content by erasing unwanted words." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Erase Words from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove specific words from your text
          </p>
        </div>
        <EraseWordsFromText />
      </div>
    </>
  );
}