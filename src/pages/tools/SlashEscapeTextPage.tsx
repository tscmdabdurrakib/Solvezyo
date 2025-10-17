import { Helmet } from 'react-helmet';
import SlashEscapeText from '@/tools/text-string/slash-escape-text';

export default function SlashEscapeTextPage() {
  return (
    <>
      <Helmet>
        <title>Slash-Escape Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add backslash escapes to special characters in your text for programming use." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Slash-Escape Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Add backslash escapes to special characters
          </p>
        </div>
        <SlashEscapeText />
      </div>
    </>
  );
}
