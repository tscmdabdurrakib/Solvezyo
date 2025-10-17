import { Helmet } from 'react-helmet';
import ConvertStringToLowercase from '@/tools/text-string/convert-string-to-lowercase';

export default function ConvertStringToLowercasePage() {
  return (
    <>
      <Helmet>
        <title>Convert String to Lowercase - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform your text to lowercase format instantly. Convert any string to all small letters with our free online lowercase converter tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Convert String to Lowercase
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform your text to lowercase format instantly
          </p>
        </div>
        <ConvertStringToLowercase />
      </div>
    </>
  );
}
