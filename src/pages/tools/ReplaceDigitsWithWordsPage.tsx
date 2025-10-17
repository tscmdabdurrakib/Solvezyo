import { Helmet } from 'react-helmet';
import ReplaceDigitsWithWords from '@/tools/text-string/replace-digits-with-words';

export default function ReplaceDigitsWithWordsPage() {
  return (
    <>
      <Helmet>
        <title>Replace Digits with Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert numerical digits to written numbers. Perfect for text formatting and readability." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Replace Digits with Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert numerical digits to written numbers
          </p>
        </div>
        <ReplaceDigitsWithWords />
      </div>
    </>
  );
}
