import { Helmet } from 'react-helmet';
import ReplaceWordsWithDigits from '@/tools/text-string/replace-words-with-digits';

export default function ReplaceWordsWithDigitsPage() {
  return (
    <>
      <Helmet>
        <title>Replace Words with Digits - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert written numbers to numerical digits. Perfect for text processing and data conversion." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Replace Words with Digits
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert written numbers to numerical digits
          </p>
        </div>
        <ReplaceWordsWithDigits />
      </div>
    </>
  );
}
