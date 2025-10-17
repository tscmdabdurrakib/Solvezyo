import { Helmet } from 'react-helmet';
import RotateText from '@/tools/text-string/rotate-text';

export default function RotateTextPage() {
  return (
    <>
      <Helmet>
        <title>Rotate Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Rotate text by moving characters from the beginning to the end. Shift text left or right." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Rotate Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Rotate text by moving characters from the beginning to the end
          </p>
        </div>
        <RotateText />
      </div>
    </>
  );
}
