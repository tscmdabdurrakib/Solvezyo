import { Helmet } from 'react-helmet';
import DuplicateVowelsInText from '@/tools/text-string/duplicate-vowels-in-text';

export default function DuplicateVowelsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Duplicate Vowels in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Duplicate vowels in your text for creative emphasis. Transform text with repeated vowel patterns." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Duplicate Vowels in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Duplicate vowels in your text for creative emphasis
          </p>
        </div>
        <DuplicateVowelsInText />
      </div>
    </>
  );
}