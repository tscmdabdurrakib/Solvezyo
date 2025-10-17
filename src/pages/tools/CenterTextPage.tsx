import { Helmet } from 'react-helmet';
import CenterText from '@/tools/text-string/center-text';

export default function CenterTextPage() {
  return (
    <>
      <Helmet>
        <title>Center Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Center-align text within a specified line width. Online text centering tool with customizable line width and automatic padding calculation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Center Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Center-align text within a specified line width
          </p>
        </div>
        <CenterText />
      </div>
    </>
  );
}
