import { Helmet } from 'react-helmet';
import CountTextLines from '@/tools/text-string/count-text-lines';

export default function CountTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Count Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Count and analyze lines in your text with detailed statistics including line length distribution and content metrics." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Count Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Count and analyze lines in your text with detailed statistics
          </p>
        </div>
        <CountTextLines />
      </div>
    </>
  );
}