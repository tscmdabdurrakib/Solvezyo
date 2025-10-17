import { Helmet } from 'react-helmet';
import RightPadText from '@/tools/text-string/right-pad-text';

export default function RightPadTextPage() {
  return (
    <>
      <Helmet>
        <title>Right-pad Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add padding characters to the right of your text. Online right padding tool with customizable padding character and target length." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Right-pad Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Add padding characters to the right of your text
          </p>
        </div>
        <RightPadText />
      </div>
    </>
  );
}
