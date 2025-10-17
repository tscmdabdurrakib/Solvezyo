import { Helmet } from 'react-helmet';
import ConvertTextToTitleCase from '@/tools/text-string/convert-text-to-title-case';

export default function ConvertTextToTitleCasePage() {
  return (
    <>
      <Helmet>
        <title>Convert Text to Title Case - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text to proper title case with smart capitalization rules. Perfect for headings and titles." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Convert Text to Title Case
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text to proper title case with smart capitalization rules
          </p>
        </div>
        <ConvertTextToTitleCase />
      </div>
    </>
  );
}