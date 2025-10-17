import { Helmet } from 'react-helmet';
import IntroduceErrorsInText from '@/tools/text-string/introduce-errors-in-text';

export default function IntroduceErrorsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Introduce Errors in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Introduce realistic typing errors into your text with customizable error types and frequency. Great for testing error correction and text processing systems." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Introduce Errors in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Introduce realistic typing errors into your text
          </p>
        </div>
        <IntroduceErrorsInText />
      </div>
    </>
  );
}
