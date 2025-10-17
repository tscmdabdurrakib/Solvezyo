import { Helmet } from 'react-helmet';
import InsertSymbolsBetweenLetters from '@/tools/text-string/insert-symbols-between-letters';

export default function InsertSymbolsBetweenLettersPage() {
  return (
    <>
      <Helmet>
        <title>Insert Symbols Between Letters - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Insert custom symbols between letters in your text for stylistic formatting and text decoration purposes." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Insert Symbols Between Letters
          </h1>
          <p className="text-muted-foreground mt-2">
            Insert custom symbols between letters in your text
          </p>
        </div>
        <InsertSymbolsBetweenLetters />
      </div>
    </>
  );
}
