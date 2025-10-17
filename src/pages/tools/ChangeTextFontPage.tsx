import { Helmet } from 'react-helmet';
import ChangeTextFont from '@/tools/text-string/change-text-font';

export default function ChangeTextFontPage() {
  return (
    <>
      <Helmet>
        <title>Change Text Font - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform your text with different Unicode font styles including bold, italic, and monospace." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Change Text Font
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform your text with different Unicode font styles
          </p>
        </div>
        <ChangeTextFont />
      </div>
    </>
  );
}