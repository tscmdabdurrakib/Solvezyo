import { Helmet } from 'react-helmet';
import AddPrefixToTextLines from '@/tools/text-string/add-prefix-to-text-lines';

export default function AddPrefixToTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Add a Prefix to Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add a prefix to the beginning of each line in your text. Perfect for creating quoted text, bullet points, and structured content." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add a Prefix to Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a prefix to the beginning of each line in your text
          </p>
        </div>
        <AddPrefixToTextLines />
      </div>
    </>
  );
}
