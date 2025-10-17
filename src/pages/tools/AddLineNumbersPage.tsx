import { Helmet } from 'react-helmet';
import AddLineNumbers from '@/tools/text-string/add-line-numbers';

export default function AddLineNumbersPage() {
  return (
    <>
      <Helmet>
        <title>Add Line Numbers - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add line numbers to your text with customizable formatting including different numbering styles and separators." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add Line Numbers
          </h1>
          <p className="text-muted-foreground mt-2">
            Add line numbers to your text with customizable formatting
          </p>
        </div>
        <AddLineNumbers />
      </div>
    </>
  );
}