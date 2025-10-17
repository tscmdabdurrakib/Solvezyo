import { Helmet } from 'react-helmet';
import DuplicateLettersInText from '@/tools/text-string/duplicate-letters-in-text';

export default function DuplicateLettersInTextPage() {
  return (
    <>
      <Helmet>
        <title>Duplicate Letters in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Repeat each letter multiple times for stylish effects. Perfect for creative text formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Duplicate Letters in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Repeat each letter multiple times for stylish effects
          </p>
        </div>
        <DuplicateLettersInText />
      </div>
    </>
  );
}
