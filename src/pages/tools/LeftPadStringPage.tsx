import { Helmet } from 'react-helmet';
import LeftPadString from '@/tools/text-string/left-pad-string';

export default function LeftPadStringPage() {
  return (
    <>
      <Helmet>
        <title>Left-pad a String - Add Padding to Left | Solvezyo</title>
        <meta
          name="description"
          content="Left-pad your text with custom padding characters. Add zeros, spaces, or any character to the left of your text until it reaches target length. Perfect for formatting numbers and strings."
        />
        <meta property="og:title" content="Left-pad a String - Add Padding to Left | Solvezyo" />
        <meta
          property="og:description"
          content="Left-pad your text with custom padding characters. Add zeros, spaces, or any character to the left of your text until it reaches target length."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <LeftPadString />
    </>
  );
}
