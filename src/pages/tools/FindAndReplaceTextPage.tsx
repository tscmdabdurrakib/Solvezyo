import { Helmet } from 'react-helmet';
import FindAndReplaceText from '@/tools/text-string/find-and-replace-text';

export default function FindAndReplaceTextPage() {
  return (
    <>
      <Helmet>
        <title>Find and Replace Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Find and replace text with support for case sensitivity, whole words, and regular expressions. Perfect for batch text editing and content modification." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Find and Replace Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Find and replace text with support for case sensitivity, whole words, and regular expressions
          </p>
        </div>
        <FindAndReplaceText />
      </div>
    </>
  );
}