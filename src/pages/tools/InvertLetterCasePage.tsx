import { Helmet } from 'react-helmet';
import InvertLetterCase from '@/tools/text-string/invert-letter-case';

export default function InvertLetterCasePage() {
  return (
    <>
      <Helmet>
        <title>Invert Letter Case - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Flip uppercase to lowercase and lowercase to uppercase. Invert the case of all letters in your text with our free online tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Invert Letter Case
          </h1>
          <p className="text-muted-foreground mt-2">
            Flip uppercase to lowercase and lowercase to uppercase
          </p>
        </div>
        <InvertLetterCase />
      </div>
    </>
  );
}
