import { Helmet } from 'react-helmet';
import GenerateStringBigrams from '@/tools/text-string/generate-string-bigrams';

export default function GenerateStringBigramsPage() {
  return (
    <>
      <Helmet>
        <title>Generate String Bigrams - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Extract word pairs (bigrams) from text with frequency analysis. Generate bigram sequences for text analysis and NLP applications." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Generate String Bigrams
          </h1>
          <p className="text-muted-foreground mt-2">
            Extract word pairs (bigrams) from text with frequency analysis
          </p>
        </div>
        <GenerateStringBigrams />
      </div>
    </>
  );
}
