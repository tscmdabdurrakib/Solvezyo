import { Helmet } from 'react-helmet';
import JoinText from '@/tools/text-string/join-text';

export default function JoinTextPage() {
  return (
    <>
      <Helmet>
        <title>Join Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Join multiple lines of text using various delimiters. Combine text data with customizable separators." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Join Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Join multiple lines of text using various delimiters
          </p>
        </div>
        <JoinText />
      </div>
    </>
  );
}
