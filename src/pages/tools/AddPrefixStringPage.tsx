import { Helmet } from 'react-helmet';
import AddPrefixString from '@/tools/text-string/add-prefix-string';

export default function AddPrefixStringPage() {
  return (
    <>
      <Helmet>
        <title>Add a Prefix to a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add a prefix to the beginning of each line of your text instantly. Online tool for adding prefixes to multi-line text with real-time preview." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Add a Prefix to a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a prefix to the beginning of each line of your text
          </p>
        </div>
        <AddPrefixString />
      </div>
    </>
  );
}
