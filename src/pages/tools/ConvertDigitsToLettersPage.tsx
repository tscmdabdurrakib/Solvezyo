import { Helmet } from 'react-helmet';
import ConvertDigitsToLetters from '@/tools/text-string/convert-digits-to-letters';

export default function ConvertDigitsToLettersPage() {
  return (
    <>
      <Helmet>
        <title>Convert Digits to Letters - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform numbers to their letter lookalikes. Perfect for decoding numerical text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Convert Digits to Letters
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform numbers to their letter lookalikes
          </p>
        </div>
        <ConvertDigitsToLetters />
      </div>
    </>
  );
}
