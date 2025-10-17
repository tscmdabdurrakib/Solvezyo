import { Helmet } from 'react-helmet';
import ConvertSpacesToTabs from '@/tools/text-string/convert-spaces-to-tabs';

export default function ConvertSpacesToTabsPage() {
  return (
    <>
      <Helmet>
        <title>Convert Spaces to Tabs - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace multiple spaces with tab characters. Convert spaces to tabs for code formatting." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Convert Spaces to Tabs
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace multiple spaces with tab characters
          </p>
        </div>
        <ConvertSpacesToTabs />
      </div>
    </>
  );
}
