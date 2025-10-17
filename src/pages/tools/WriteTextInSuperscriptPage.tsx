import { Helmet } from 'react-helmet';
import WriteTextInSuperscript from '@/tools/text-string/write-text-in-superscript';

export default function WriteTextInSuperscriptPage() {
  return (
    <>
      <Helmet>
        <title>Write Text in Superscript - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to superscript format using Unicode characters. Perfect for mathematical expressions and scientific notation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Write Text in Superscript
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to superscript format using Unicode characters
          </p>
        </div>
        <WriteTextInSuperscript />
      </div>
    </>
  );
}