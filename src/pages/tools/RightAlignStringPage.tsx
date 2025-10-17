import { Helmet } from 'react-helmet';
import RightAlignString from '@/tools/text-string/right-align-string';

export default function RightAlignStringPage() {
  return (
    <>
      <Helmet>
        <title>Right-align a String - Align Text to Right | Solvezyo</title>
        <meta
          name="description"
          content="Right-align your text with specified width. Align multiple lines to the right side for professional formatting. Perfect for creating aligned text blocks and documents."
        />
        <meta property="og:title" content="Right-align a String - Align Text to Right | Solvezyo" />
        <meta
          property="og:description"
          content="Right-align your text with specified width. Align multiple lines to the right side for professional formatting."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <RightAlignString />
    </>
  );
}
