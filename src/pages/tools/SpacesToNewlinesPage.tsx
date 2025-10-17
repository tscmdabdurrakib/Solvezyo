import { Helmet } from 'react-helmet';
import SpacesToNewlines from '@/tools/text-string/spaces-to-newlines';

export default function SpacesToNewlinesPage() {
  return (
    <>
      <Helmet>
        <title>Convert Spaces to Newlines - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all spaces in your text with newline characters instantly. Online tool for converting horizontal text to vertical list format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Convert Spaces to Newlines
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all spaces in your text with newline characters
          </p>
        </div>
        <SpacesToNewlines />
      </div>
    </>
  );
}
