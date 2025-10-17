import { Helmet } from 'react-helmet';
import ReplaceConsonantsInText from '@/tools/text-string/replace-consonants-in-text';

export default function ReplaceConsonantsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Replace Consonants in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace consonants in your text with custom characters or symbols. Transform your text creatively." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Replace Consonants in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace consonants in your text with custom characters or symbols
          </p>
        </div>
        <ReplaceConsonantsInText />
      </div>
    </>
  );
}