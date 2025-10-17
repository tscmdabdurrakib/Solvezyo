import { Helmet } from 'react-helmet';
import ReverseWordsInText from '@/tools/text-string/reverse-words-in-text';

export default function ReverseWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Reverse Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Reverse each individual word in your text while maintaining word positions. Perfect for creating scrambled text effects." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Reverse Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Reverse each individual word while maintaining word positions
          </p>
        </div>
        <ReverseWordsInText />
      </div>
    </>
  );
}
