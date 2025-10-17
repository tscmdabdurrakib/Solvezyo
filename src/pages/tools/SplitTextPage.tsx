import { Helmet } from 'react-helmet';
import SplitText from '@/tools/text-string/split-text';

export default function SplitTextPage() {
  return (
    <>
      <Helmet>
        <title>Split Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Split text into separate lines using various delimiters. Break down text data with customizable separators." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Split Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Split text into separate lines using various delimiters
          </p>
        </div>
        <SplitText />
      </div>
    </>
  );
}
