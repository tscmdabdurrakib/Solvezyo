import { Helmet } from 'react-helmet';
import ConvertStringToUppercase from '@/tools/text-string/convert-string-to-uppercase';

export default function ConvertStringToUppercasePage() {
  return (
    <>
      <Helmet>
        <title>Convert String to Uppercase - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform your text to uppercase format instantly. Convert any string to all capital letters with our free online uppercase converter tool." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Convert String to Uppercase
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform your text to uppercase format instantly
          </p>
        </div>
        <ConvertStringToUppercase />
      </div>
    </>
  );
}
