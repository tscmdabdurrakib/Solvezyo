import { Helmet } from 'react-helmet';
import LeftAlignText from '@/tools/text-string/left-align-text';

export default function LeftAlignTextPage() {
  return (
    <>
      <Helmet>
        <title>Left-align Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Align text to the left with consistent line width. Online left text alignment tool with customizable line width settings." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Left-align Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Align text to the left with consistent line width
          </p>
        </div>
        <LeftAlignText />
      </div>
    </>
  );
}
