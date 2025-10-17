import { Helmet } from 'react-helmet';
import RandomizeTextSentences from '@/tools/text-string/randomize-text-sentences';

export default function RandomizeTextSentencesPage() {
  return (
    <>
      <Helmet>
        <title>Randomize Text Sentences - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shuffle the order of sentences in your text randomly. Perfect for mixing up content, creating varied paragraphs, and randomizing sentence order." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Randomize Text Sentences
          </h1>
          <p className="text-muted-foreground mt-2">
            Shuffle the order of sentences in your text randomly
          </p>
        </div>
        <RandomizeTextSentences />
      </div>
    </>
  );
}