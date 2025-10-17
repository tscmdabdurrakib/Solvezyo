import { Helmet } from 'react-helmet';
import TransposeString from '@/tools/text-string/transpose-string';

export default function TransposeStringPage() {
  return (
    <>
      <Helmet>
        <title>Transpose a String - Swap Rows and Columns | Solvezyo</title>
        <meta
          name="description"
          content="Transpose text by swapping rows and columns. Convert vertical text to horizontal and vice versa. Perfect for text matrix manipulation and data transformation."
        />
        <meta property="og:title" content="Transpose a String - Swap Rows and Columns | Solvezyo" />
        <meta
          property="og:description"
          content="Transpose text by swapping rows and columns. Convert vertical text to horizontal and vice versa. Perfect for text matrix manipulation."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <TransposeString />
    </>
  );
}
