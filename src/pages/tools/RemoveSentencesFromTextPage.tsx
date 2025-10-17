import { Helmet } from 'react-helmet';
import RemoveSentencesFromText from '@/tools/text-string/remove-sentences-from-text';

export default function RemoveSentencesFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove Sentences from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove sentences containing specific keywords from your text. Clean up your content by filtering out unwanted sentences automatically." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove Sentences from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove sentences containing specific keywords
          </p>
        </div>
        <RemoveSentencesFromText />
      </div>
    </>
  );
}
