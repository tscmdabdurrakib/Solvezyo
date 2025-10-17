import { Helmet } from 'react-helmet';
import RightPadString from '@/tools/text-string/right-pad-string';

export default function RightPadStringPage() {
  return (
    <>
      <Helmet>
        <title>Right-pad a String - Add Padding to Right | Solvezyo</title>
        <meta
          name="description"
          content="Right-pad your text with custom padding characters. Add dots, spaces, or any character to the right of your text until it reaches target length. Perfect for creating tables and lists."
        />
        <meta property="og:title" content="Right-pad a String - Add Padding to Right | Solvezyo" />
        <meta
          property="og:description"
          content="Right-pad your text with custom padding characters. Add dots, spaces, or any character to the right of your text until it reaches target length."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <RightPadString />
    </>
  );
}
