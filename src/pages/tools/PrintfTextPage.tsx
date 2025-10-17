import { Helmet } from 'react-helmet';
import PrintfText from '@/tools/text-string/printf-text';

export default function PrintfTextPage() {
  return (
    <>
      <Helmet>
        <title>Printf Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Format text using printf-style placeholders. String formatting with %s, %d, %f and more." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Printf Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Format text using printf-style placeholders
          </p>
        </div>
        <PrintfText />
      </div>
    </>
  );
}
