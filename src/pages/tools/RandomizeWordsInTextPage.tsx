import { Helmet } from 'react-helmet';
import RandomizeWordsInText from '@/tools/text-string/randomize-words-in-text';

export default function RandomizeWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Randomize Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Randomly shuffle the order of words in your text with various preservation options. Online tool for text randomization and content mixing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Randomize Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Randomly shuffle the order of words in your text
          </p>
        </div>
        <RandomizeWordsInText />
      </div>
    </>
  );
}