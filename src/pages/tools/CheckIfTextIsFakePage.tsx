import { Helmet } from 'react-helmet';
import CheckIfTextIsFake from '@/tools/text-string/check-if-text-is-fake';

export default function CheckIfTextIsFakePage() {
  return (
    <>
      <Helmet>
        <title>Check If Text Is Fake - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Analyze text to detect if it contains fake placeholder content like Lorem Ipsum. Get detailed analysis with confidence scores and statistics." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Check If Text Is Fake
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze text to detect fake placeholder content
          </p>
        </div>
        <CheckIfTextIsFake />
      </div>
    </>
  );
}
