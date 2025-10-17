import { Helmet } from 'react-helmet';
import SliceText from '@/tools/text-string/slice-text';

export default function SliceTextPage() {
  return (
    <>
      <Helmet>
        <title>Slice Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Extract a portion of text by start and end positions. Online text slicing tool with customizable indices and real-time preview." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Slice Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Extract a portion of text by start and end positions
          </p>
        </div>
        <SliceText />
      </div>
    </>
  );
}
