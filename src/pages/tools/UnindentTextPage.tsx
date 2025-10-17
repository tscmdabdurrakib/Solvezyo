import { Helmet } from 'react-helmet';
import UnindentText from '@/tools/text-string/unindent-text';

export default function UnindentTextPage() {
  return (
    <>
      <Helmet>
        <title>Unindent Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove indentation from each line of your text with customizable space removal and tab handling. Perfect for cleaning up formatted text." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Unindent Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove indentation from each line of your text
          </p>
        </div>
        <UnindentText />
      </div>
    </>
  );
}
