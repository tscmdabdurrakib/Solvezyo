import { Helmet } from 'react-helmet';
import FindReplaceString from '@/tools/text-string/find-replace-string';

export default function FindReplaceStringPage() {
  return (
    <>
      <Helmet>
        <title>Find and Replace a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Search and replace text with custom options. Online tool to find and replace strings with case-sensitive and case-insensitive support." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Find and Replace a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Search and replace text with custom options
          </p>
        </div>
        <FindReplaceString />
      </div>
    </>
  );
}
