import { Helmet } from 'react-helmet';
import GenerateTextFromRegExp from '@/tools/text-string/generate-text-from-regexp';

export default function GenerateTextFromRegExpPage() {
  return (
    <>
      <Helmet>
        <title>Generate Text from RegExp - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Generate random text that matches a regular expression pattern. Create sample data from regex patterns." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Generate Text from RegExp
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate random text that matches a regular expression pattern
          </p>
        </div>
        <GenerateTextFromRegExp />
      </div>
    </>
  );
}
