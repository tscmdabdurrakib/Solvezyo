import { Helmet } from 'react-helmet';
import TrimText from '@/tools/text-string/trim-text';

export default function TrimTextPage() {
  return (
    <>
      <Helmet>
        <title>Trim Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove leading and trailing whitespace from text. Online text trimming tool that removes spaces, tabs, and newlines from the beginning and end." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Trim Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove leading and trailing whitespace from text
          </p>
        </div>
        <TrimText />
      </div>
    </>
  );
}
