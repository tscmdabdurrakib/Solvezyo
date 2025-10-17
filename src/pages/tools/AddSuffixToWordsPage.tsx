import { Helmet } from 'react-helmet';
import AddSuffixToWords from '@/tools/text-string/add-suffix-to-words';

export default function AddSuffixToWordsPage() {
  return (
    <>
      <Helmet>
        <title>Add a Suffix to Words - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add a suffix to the end of each word in your text. Perfect for adding suffixes, extensions, and word modifications." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add a Suffix to Words
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a suffix to the end of each word in your text
          </p>
        </div>
        <AddSuffixToWords />
      </div>
    </>
  );
}
