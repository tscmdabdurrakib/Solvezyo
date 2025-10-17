import { Helmet } from 'react-helmet';
import DecrementLetters from '@/tools/text-string/decrement-letters';

export default function DecrementLettersPage() {
  return (
    <>
      <Helmet>
        <title>Decrement Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shift letters backward in the alphabet. Reverse Caesar cipher decoder for text decryption and letter manipulation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Decrement Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Shift letters backward in the alphabet (Reverse Caesar cipher)
          </p>
        </div>
        <DecrementLetters />
      </div>
    </>
  );
}
