import { Helmet } from 'react-helmet';
import UnfakeText from '@/tools/text-string/unfake-text';

export default function UnfakeTextPage() {
  return (
    <>
      <Helmet>
        <title>Unfake Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert fake placeholder text into meaningful content with intelligent replacement patterns. Transform Lorem Ipsum and placeholder text into readable content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Unfake Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert fake placeholder text into meaningful content
          </p>
        </div>
        <UnfakeText />
      </div>
    </>
  );
}
