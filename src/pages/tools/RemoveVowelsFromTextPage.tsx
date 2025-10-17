import { Helmet } from 'react-helmet';
import RemoveVowelsFromText from '@/tools/text-string/remove-vowels-from-text';

export default function RemoveVowelsFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove Vowels from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all vowels from your text. Create consonant-only text for various applications." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            Remove Vowels from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all vowels from your text
          </p>
        </div>
        <RemoveVowelsFromText />
      </div>
    </>
  );
}