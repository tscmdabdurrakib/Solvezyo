import { Helmet } from 'react-helmet';
import ReverseSentencesInText from '@/tools/text-string/reverse-sentences-in-text';

export default function ReverseSentencesInTextPage() {
  return (
    <>
      <Helmet>
        <title>Reverse Sentences in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Reverse the order of sentences within each paragraph while preserving sentence content. Perfect for text manipulation and creative writing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Reverse Sentences in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Reverse the order of sentences within each paragraph
          </p>
        </div>
        <ReverseSentencesInText />
      </div>
    </>
  );
}
