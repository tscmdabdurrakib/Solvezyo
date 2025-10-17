import { Helmet } from 'react-helmet';
import DuplicateWordsInText from '@/tools/text-string/duplicate-words-in-text';

export default function DuplicateWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Duplicate Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Duplicate each word in the text, creating a repeated effect. Perfect for text emphasis and creative writing effects." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Duplicate Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Duplicate each word in the text, creating a repeated effect
          </p>
        </div>
        <DuplicateWordsInText />
      </div>
    </>
  );
}
