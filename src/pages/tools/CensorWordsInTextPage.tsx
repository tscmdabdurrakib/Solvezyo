import { Helmet } from 'react-helmet';
import CensorWordsInText from '@/tools/text-string/censor-words-in-text';

export default function CensorWordsInTextPage() {
  return (
    <>
      <Helmet>
        <title>Censor Words in Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Automatically censor specified words in your text. Perfect for content moderation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Censor Words in Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Automatically censor specified words in your text
          </p>
        </div>
        <CensorWordsInText />
      </div>
    </>
  );
}
