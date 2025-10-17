import { Helmet } from 'react-helmet';
import AddQuotesToText from '@/tools/text-string/add-quotes-to-text';

export default function AddQuotesToTextPage() {
  return (
    <>
      <Helmet>
        <title>Add Quotes to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Wrap your entire text with quotation marks. Add double quotes, single quotes, or backticks to text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Add Quotes to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Wrap your entire text with quotation marks
          </p>
        </div>
        <AddQuotesToText />
      </div>
    </>
  );
}
