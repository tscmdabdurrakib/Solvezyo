import { Helmet } from 'react-helmet';
import RotateString from '@/tools/text-string/rotate-string';

export default function RotateStringPage() {
  return (
    <>
      <Helmet>
        <title>Rotate a String - Shift Characters | Solvezyo</title>
        <meta
          name="description"
          content="Rotate your text by shifting characters left or right. Perfect for string manipulation, circular shifts, and text transformations with instant real-time preview."
        />
        <meta property="og:title" content="Rotate a String - Shift Characters | Solvezyo" />
        <meta
          property="og:description"
          content="Rotate your text by shifting characters left or right. Perfect for string manipulation, circular shifts, and text transformations."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <RotateString />
    </>
  );
}
