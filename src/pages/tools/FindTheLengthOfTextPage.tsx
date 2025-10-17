import { Helmet } from 'react-helmet';
import FindTheLengthOfText from '@/tools/text-string/find-the-length-of-text';

export default function FindTheLengthOfTextPage() {
  return (
    <>
      <Helmet>
        <title>Find the Length of Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Comprehensive text analysis including character, word, sentence, and paragraph counts. Perfect for content analysis and text statistics." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Find the Length of Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive text analysis including character, word, sentence, and paragraph counts
          </p>
        </div>
        <FindTheLengthOfText />
      </div>
    </>
  );
}