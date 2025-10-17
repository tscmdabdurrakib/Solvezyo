import { Helmet } from 'react-helmet';
import AddSuffixToTextLines from '@/tools/text-string/add-suffix-to-text-lines';

export default function AddSuffixToTextLinesPage() {
  return (
    <>
      <Helmet>
        <title>Add a Suffix to Text Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add a suffix to the end of each line in your text. Perfect for adding punctuation, arrows, and formatting elements." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add a Suffix to Text Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a suffix to the end of each line in your text
          </p>
        </div>
        <AddSuffixToTextLines />
      </div>
    </>
  );
}
