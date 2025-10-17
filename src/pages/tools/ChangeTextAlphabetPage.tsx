import { Helmet } from 'react-helmet';
import ChangeTextAlphabet from '@/tools/text-string/change-text-alphabet';

export default function ChangeTextAlphabetPage() {
  return (
    <>
      <Helmet>
        <title>Change Text Alphabet - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to different alphabet styles. Perfect for unique text formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Change Text Alphabet
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to different alphabet styles
          </p>
        </div>
        <ChangeTextAlphabet />
      </div>
    </>
  );
}
