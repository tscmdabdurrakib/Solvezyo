import { Helmet } from 'react-helmet';
import WriteTextInSubscript from '@/tools/text-string/write-text-in-subscript';

export default function WriteTextInSubscriptPage() {
  return (
    <>
      <Helmet>
        <title>Write Text in Subscript - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to subscript format using Unicode characters. Perfect for chemical formulas and mathematical expressions." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Write Text in Subscript
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to subscript format using Unicode characters
          </p>
        </div>
        <WriteTextInSubscript />
      </div>
    </>
  );
}