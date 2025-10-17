import { Helmet } from 'react-helmet';
import ROT13String from '@/tools/text-string/rot13-string';

export default function ROT13StringPage() {
  return (
    <>
      <Helmet>
        <title>ROT13 a String - Cipher Encoder/Decoder | Solvezyo</title>
        <meta
          name="description"
          content="Apply ROT13 cipher encryption and decryption to your text. Simple letter substitution cipher that shifts letters by 13 positions. Self-inverse encoding with instant results."
        />
        <meta property="og:title" content="ROT13 a String - Cipher Encoder/Decoder | Solvezyo" />
        <meta
          property="og:description"
          content="Apply ROT13 cipher encryption and decryption to your text. Simple letter substitution cipher that shifts letters by 13 positions."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ROT13String />
    </>
  );
}
