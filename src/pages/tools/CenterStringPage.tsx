import { Helmet } from 'react-helmet';
import CenterString from '@/tools/text-string/center-string';

export default function CenterStringPage() {
  return (
    <>
      <Helmet>
        <title>Center a String - Center Text with Custom Width | Solvezyo</title>
        <meta
          name="description"
          content="Center your text within specified width with custom fill characters. Perfect for creating headers, titles, and centered text blocks. Supports multiple lines and custom padding."
        />
        <meta property="og:title" content="Center a String - Center Text with Custom Width | Solvezyo" />
        <meta
          property="og:description"
          content="Center your text within specified width with custom fill characters. Perfect for creating headers, titles, and centered text blocks."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <CenterString />
    </>
  );
}
