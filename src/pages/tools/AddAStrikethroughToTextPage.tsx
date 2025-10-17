import { Helmet } from 'react-helmet';
import AddAStrikethroughToText from '@/tools/text-string/add-a-strikethrough-to-text';

export default function AddAStrikethroughToTextPage() {
  return (
    <>
      <Helmet>
        <title>Add a Strikethrough to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add strikethrough formatting to your text using Unicode characters." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Add a Strikethrough to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Add strikethrough formatting to your text
          </p>
        </div>
        <AddAStrikethroughToText />
      </div>
    </>
  );
}
