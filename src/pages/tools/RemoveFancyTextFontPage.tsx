import { Helmet } from 'react-helmet';
import RemoveFancyTextFont from '@/tools/text-string/remove-fancy-text-font';

export default function RemoveFancyTextFontPage() {
  return (
    <>
      <Helmet>
        <title>Remove Fancy Text Font - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert fancy Unicode text back to normal characters. Remove stylized fonts and return to plain text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Remove Fancy Text Font
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert fancy Unicode text back to normal characters
          </p>
        </div>
        <RemoveFancyTextFont />
      </div>
    </>
  );
}