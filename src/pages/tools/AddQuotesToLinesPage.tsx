import { Helmet } from 'react-helmet';
import AddQuotesToLines from '@/tools/text-string/add-quotes-to-lines';

export default function AddQuotesToLinesPage() {
  return (
    <>
      <Helmet>
        <title>Add Quotes to Lines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Wrap each line with quotation marks. Add quotes to every line in your multi-line text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Add Quotes to Lines
          </h1>
          <p className="text-muted-foreground mt-2">
            Wrap each line with quotation marks
          </p>
        </div>
        <AddQuotesToLines />
      </div>
    </>
  );
}
