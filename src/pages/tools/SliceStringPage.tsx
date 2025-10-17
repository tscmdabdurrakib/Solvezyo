import { Helmet } from 'react-helmet';
import SliceString from '@/tools/text-string/slice-string';

export default function SliceStringPage() {
  return (
    <>
      <Helmet>
        <title>Slice a String - Extract Text Portion | Solvezyo</title>
        <meta
          name="description"
          content="Extract a portion of text using start and end indices. Slice strings with negative indices support for counting from the end. Perfect for substring extraction and text manipulation."
        />
        <meta property="og:title" content="Slice a String - Extract Text Portion | Solvezyo" />
        <meta
          property="og:description"
          content="Extract a portion of text using start and end indices. Slice strings with negative indices support for counting from the end."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <SliceString />
    </>
  );
}
