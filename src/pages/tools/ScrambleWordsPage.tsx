import { Helmet } from 'react-helmet';
import ScrambleWords from '@/tools/text-string/scramble-words';

export default function ScrambleWordsPage() {
  return (
    <>
      <Helmet>
        <title>Scramble Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Scramble letters within each word while keeping words readable. Online tool for text obfuscation and word scrambling." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Scramble Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Scramble letters within each word while keeping words readable
          </p>
        </div>
        <ScrambleWords />
      </div>
    </>
  );
}