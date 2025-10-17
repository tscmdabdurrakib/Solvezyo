import { Helmet } from 'react-helmet';
import AddRandomLettersToWords from '@/tools/text-string/add-random-letters-to-words';

export default function AddRandomLettersToWordsPage() {
  return (
    <>
      <Helmet>
        <title>Add Random Letters to Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add random letters to words in your text with customizable insertion probability. Perfect for text obfuscation and creative modifications." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add Random Letters to Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Add random letters to words in your text
          </p>
        </div>
        <AddRandomLettersToWords />
      </div>
    </>
  );
}
