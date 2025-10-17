import { Helmet } from 'react-helmet';
import TabsToSpaces from '@/tools/text-string/tabs-to-spaces';

export default function TabsToSpacesPage() {
  return (
    <>
      <Helmet>
        <title>Convert Tabs to Spaces - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace all tab characters with spaces instantly. Online tool for consistent text formatting and code style." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Convert Tabs to Spaces
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace all tab characters with spaces for consistent formatting
          </p>
        </div>
        <TabsToSpaces />
      </div>
    </>
  );
}
