import { Helmet } from 'react-helmet';
import ReplaceVowelsInText from '@/tools/text-string/replace-vowels-in-text';

export default function ReplaceVowelsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Replace Vowels in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace vowels in your text with custom characters or symbols. Transform your text creatively." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Replace Vowels in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace vowels in your text with custom characters or symbols
          </p>
        </div>
        <ReplaceVowelsInText />
      </div>
    </>
  );
}