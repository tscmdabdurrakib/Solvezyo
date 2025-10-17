import { Helmet } from 'react-helmet';
import AddRandomWordsToText from '@/tools/text-string/add-random-words-to-text';

export default function AddRandomWordsToTextPage() {
  return (
    <>
      <Helmet>
        <title>Add Random Words to Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Insert random words into your text with customizable word types and insertion frequency. Great for text augmentation and creative writing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add Random Words to Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Insert random words into your text content
          </p>
        </div>
        <AddRandomWordsToText />
      </div>
    </>
  );
}
