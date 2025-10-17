import { Helmet } from 'react-helmet';
import ROT47String from '@/tools/text-string/rot47-string';

export default function ROT47StringPage() {
  return (
    <>
      <Helmet>
        <title>ROT47 a String - ASCII Cipher Encoder | Solvezyo</title>
        <meta
          name="description"
          content="Apply ROT47 cipher to encode/decode ASCII printable characters including numbers and symbols. Extended version of ROT13 with 94 printable characters rotation."
        />
        <meta property="og:title" content="ROT47 a String - ASCII Cipher Encoder | Solvezyo" />
        <meta
          property="og:description"
          content="Apply ROT47 cipher to encode/decode ASCII printable characters including numbers and symbols. Extended version of ROT13."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ROT47String />
    </>
  );
}
