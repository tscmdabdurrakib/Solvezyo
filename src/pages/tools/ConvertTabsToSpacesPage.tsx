import { Helmet } from 'react-helmet';
import ConvertTabsToSpaces from '@/tools/text-string/convert-tabs-to-spaces';

export default function ConvertTabsToSpacesPage() {
  return (
    <>
      <Helmet>
        <title>Convert Tabs to Spaces - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace tab characters with multiple spaces. Convert tabs to spaces for code formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Tabs to Spaces
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace tab characters with multiple spaces
          </p>
        </div>
        <ConvertTabsToSpaces />
      </div>
    </>
  );
}
