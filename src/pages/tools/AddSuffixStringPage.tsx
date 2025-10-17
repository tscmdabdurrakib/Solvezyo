import { Helmet } from 'react-helmet';
import AddSuffixString from '@/tools/text-string/add-suffix-string';

export default function AddSuffixStringPage() {
  return (
    <>
      <Helmet>
        <title>Add a Suffix to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add a suffix to the end of each line of your text instantly. Online tool for adding suffixes to multi-line text with real-time preview." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Add a Suffix to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a suffix to the end of each line of your text
          </p>
        </div>
        <AddSuffixString />
      </div>
    </>
  );
}
