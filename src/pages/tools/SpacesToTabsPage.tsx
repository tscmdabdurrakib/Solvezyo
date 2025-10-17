import { Helmet } from 'react-helmet';
import SpacesToTabs from '@/tools/text-string/spaces-to-tabs';

export default function SpacesToTabsPage() {
  return (
    <>
      <Helmet>
        <title>Convert Spaces to Tabs - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Replace consecutive spaces with tab characters instantly. Online tool for improving code formatting and indentation." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Convert Spaces to Tabs
          </h1>
          <p className="text-muted-foreground mt-2">
            Replace consecutive spaces with tab characters for better formatting
          </p>
        </div>
        <SpacesToTabs />
      </div>
    </>
  );
}
