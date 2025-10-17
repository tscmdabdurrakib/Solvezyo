import { Helmet } from 'react-helmet';
import GenerateStringUnigrams from '@/tools/text-string/generate-string-unigrams';

export default function GenerateStringUnigramsPage() {
  return (
    <>
      <Helmet>
        <title>Generate String Unigrams - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Extract individual words (unigrams) from text with frequency analysis. Generate word lists for text analysis and NLP tasks." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Generate String Unigrams
          </h1>
          <p className="text-muted-foreground mt-2">
            Extract individual words (unigrams) from text with frequency analysis
          </p>
        </div>
        <GenerateStringUnigrams />
      </div>
    </>
  );
}
