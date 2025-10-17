import { Helmet } from 'react-helmet';
import LeftPadText from '@/tools/text-string/left-pad-text';

export default function LeftPadTextPage() {
  return (
    <>
      <Helmet>
        <title>Left-pad Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add padding characters to the left of your text. Online left padding tool with customizable padding character and target length." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Left-pad Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Add padding characters to the left of your text
          </p>
        </div>
        <LeftPadText />
      </div>
    </>
  );
}
