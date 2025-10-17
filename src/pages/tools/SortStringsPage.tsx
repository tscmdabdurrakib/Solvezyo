import { Helmet } from 'react-helmet';
import SortStrings from '@/tools/text-string/sort-strings';

export default function SortStringsPage() {
  return (
    <>
      <Helmet>
        <title>Sort Strings - Sort Text Lines Multiple Ways | Solvezyo</title>
        <meta
          name="description"
          content="Sort multiple lines of text alphabetically, by length, or in reverse order. Supports case-sensitive and case-insensitive sorting. Perfect for organizing lists and data."
        />
        <meta property="og:title" content="Sort Strings - Sort Text Lines Multiple Ways | Solvezyo" />
        <meta
          property="og:description"
          content="Sort multiple lines of text alphabetically, by length, or in reverse order. Supports case-sensitive and case-insensitive sorting."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <SortStrings />
    </>
  );
}
