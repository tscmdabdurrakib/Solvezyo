import { Helmet } from 'react-helmet';
import RemovePrefixFromText from '@/tools/text-string/remove-prefix-from-text';

export default function RemovePrefixFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Remove a Prefix from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove a specific prefix from the beginning of lines in your text. Clean up quoted text, bullet points, and structured content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Remove a Prefix from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove a specific prefix from the beginning of lines in your text
          </p>
        </div>
        <RemovePrefixFromText />
      </div>
    </>
  );
}