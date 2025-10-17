import { Helmet } from 'react-helmet';
import WrapWordsInText from '@/tools/text-string/wrap-words-in-text';

export default function WrapWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Wrap Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Wrap text at a specified line width by breaking between words with optional long word breaking. Perfect for formatting text content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Wrap Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Wrap text at a specified line width by breaking between words
          </p>
        </div>
        <WrapWordsInText />
      </div>
    </>
  );
}
