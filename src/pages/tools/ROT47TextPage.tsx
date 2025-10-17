import { Helmet } from 'react-helmet';
import ROT47Text from '@/tools/text-string/rot47-text';

export default function ROT47TextPage() {
  return (
    <>
      <Helmet>
        <title>ROT47 Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Encode or decode text using ROT47 cipher. Works with all printable ASCII characters including numbers and symbols." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            ROT47 Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode/decode text using ROT47 cipher
          </p>
        </div>
        <ROT47Text />
      </div>
    </>
  );
}
