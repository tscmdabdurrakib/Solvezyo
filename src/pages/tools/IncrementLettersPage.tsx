import { Helmet } from 'react-helmet';
import IncrementLetters from '@/tools/text-string/increment-letters';

export default function IncrementLettersPage() {
  return (
    <>
      <Helmet>
        <title>Increment Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shift letters forward in the alphabet. Caesar cipher encoder for text encryption and letter manipulation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Increment Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Shift letters forward in the alphabet (Caesar cipher)
          </p>
        </div>
        <IncrementLetters />
      </div>
    </>
  );
}
