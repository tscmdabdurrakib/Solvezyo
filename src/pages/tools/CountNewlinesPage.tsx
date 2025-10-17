import { Helmet } from 'react-helmet';
import CountNewlines from '@/tools/text-string/count-newlines';

export default function CountNewlinesPage() {
  return (
    <>
      <Helmet>
        <title>Count Newlines in a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Count the number of newline characters and total lines in text instantly. Online tool for text analysis and formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Count Newlines in a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Count the number of newline characters and total lines in your text
          </p>
        </div>
        <CountNewlines />
      </div>
    </>
  );
}
