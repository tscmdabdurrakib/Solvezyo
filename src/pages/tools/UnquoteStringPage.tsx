import { Helmet } from 'react-helmet';
import UnquoteString from '@/tools/text-string/unquote-string';

export default function UnquoteStringPage() {
  return (
    <>
      <Helmet>
        <title>Unquote a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove quotes and brackets from each line of your text instantly. Online tool for removing various quote types and brackets from text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Unquote a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove quotes and brackets from each line of your text
          </p>
        </div>
        <UnquoteString />
      </div>
    </>
  );
}
