import { Helmet } from 'react-helmet';
import AddCurseWordsToText from '@/tools/text-string/add-curse-words-to-text';

export default function AddCurseWordsToTextPage() {
  return (
    <>
      <Helmet>
        <title>Add Curse Words To Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Automatically add curse words to your text for emphasis or humor. Use responsibly." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Add Curse Words To Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Automatically add curse words to your text
          </p>
        </div>
        <AddCurseWordsToText />
      </div>
    </>
  );
}
