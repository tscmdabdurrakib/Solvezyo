import { Helmet } from 'react-helmet';
import SlashUnescapeText from '@/tools/text-string/slash-unescape-text';

export default function SlashUnescapeTextPage() {
  return (
    <>
      <Helmet>
        <title>Slash Unescape Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert escaped characters back to their original form. Unescape \\n, \\t, \\r, and other special characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Slash Unescape Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert escaped characters back to their original form
          </p>
        </div>
        <SlashUnescapeText />
      </div>
    </>
  );
}
