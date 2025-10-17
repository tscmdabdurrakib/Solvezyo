import { Helmet } from 'react-helmet';
import DuplicateSentencesInText from '@/tools/text-string/duplicate-sentences-in-text';

export default function DuplicateSentencesInTextPage() {
  return (
    <>
      <Helmet>
        <title>Duplicate Sentences in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Duplicate sentences containing specific keywords in your text. Control the number of duplications and customize the duplication behavior." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Duplicate Sentences in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Duplicate sentences containing specific keywords
          </p>
        </div>
        <DuplicateSentencesInText />
      </div>
    </>
  );
}
