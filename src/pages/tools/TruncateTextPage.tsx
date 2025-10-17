import { Helmet } from 'react-helmet';
import TruncateText from '@/tools/text-string/truncate-text';

export default function TruncateTextPage() {
  return (
    <>
      <Helmet>
        <title>Truncate Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Shorten your text to a specific character limit with optional ellipsis. Online text truncation tool with real-time updates and customizable settings." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Truncate Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Shorten your text to a specific character limit
          </p>
        </div>
        <TruncateText />
      </div>
    </>
  );
}
