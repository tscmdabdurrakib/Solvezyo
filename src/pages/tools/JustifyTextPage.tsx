import { Helmet } from 'react-helmet';
import JustifyText from '@/tools/text-string/justify-text';

export default function JustifyTextPage() {
  return (
    <>
      <Helmet>
        <title>Justify Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Justify text by evenly distributing spaces between words with customizable line width. Perfect for creating professional formatted documents." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Justify Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Justify text by evenly distributing spaces between words
          </p>
        </div>
        <JustifyText />
      </div>
    </>
  );
}
