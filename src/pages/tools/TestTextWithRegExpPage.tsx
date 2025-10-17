import { Helmet } from 'react-helmet';
import TestTextWithRegExp from '@/tools/text-string/test-text-with-regexp';

export default function TestTextWithRegExpPage() {
  return (
    <>
      <Helmet>
        <title>Test Text with RegExp - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Test if text matches a regular expression pattern. Validate emails, phone numbers, and more with regex." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Test Text with RegExp
          </h1>
          <p className="text-muted-foreground mt-2">
            Test if text matches a regular expression pattern
          </p>
        </div>
        <TestTextWithRegExp />
      </div>
    </>
  );
}
