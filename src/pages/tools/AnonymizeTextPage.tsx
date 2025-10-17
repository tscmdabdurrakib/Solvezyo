import { Helmet } from 'react-helmet';
import AnonymizeText from '@/tools/text-string/anonymize-text';

export default function AnonymizeTextPage() {
  return (
    <>
      <Helmet>
        <title>Anonymize Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Automatically redact personal information from your text. Protect privacy by anonymizing emails, phones, and addresses." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Anonymize Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Automatically redact personal information from your text
          </p>
        </div>
        <AnonymizeText />
      </div>
    </>
  );
}
