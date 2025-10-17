import { Helmet } from 'react-helmet';
import RightAlignText from '@/tools/text-string/right-align-text';

export default function RightAlignTextPage() {
  return (
    <>
      <Helmet>
        <title>Right-align Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Align text to the right with consistent line width. Online right text alignment tool with customizable line width settings." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Right-align Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Align text to the right with consistent line width
          </p>
        </div>
        <RightAlignText />
      </div>
    </>
  );
}
