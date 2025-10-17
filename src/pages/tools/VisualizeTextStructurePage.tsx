import { Helmet } from 'react-helmet';
import VisualizeTextStructure from '@/tools/text-string/visualize-text-structure';

export default function VisualizeTextStructurePage() {
  return (
    <>
      <Helmet>
        <title>Visualize Text Structure - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Analyze and visualize the structure of your text. See character distribution, word patterns, and text composition." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Visualize Text Structure
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze and visualize the structure of your text
          </p>
        </div>
        <VisualizeTextStructure />
      </div>
    </>
  );
}