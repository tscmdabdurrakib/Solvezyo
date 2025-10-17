import { Helmet } from 'react-helmet';
import ChangeStringCase from '@/tools/text-string/change-string-case';

export default function ChangeStringCasePage() {
  return (
    <>
      <Helmet>
        <title>Change String Case - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text to different case formats with multiple options: uppercase, lowercase, title case, camel case, and more instantly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
            Change String Case
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to different case formats with multiple options
          </p>
        </div>
        <ChangeStringCase />
      </div>
    </>
  );
}
