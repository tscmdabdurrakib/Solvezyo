import { Helmet } from 'react-helmet';
import ConvertBbcodeToString from '@/tools/text-string/convert-bbcode-to-string';

export default function ConvertBbcodeToStringPage() {
  return (
    <>
      <Helmet>
        <title>Convert BBCode to String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert BBCode markup to plain text by removing formatting tags. Transform forum posts and BBCode content to readable text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Convert BBCode to String
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert BBCode markup to plain text by removing formatting tags
          </p>
        </div>
        <ConvertBbcodeToString />
      </div>
    </>
  );
}
