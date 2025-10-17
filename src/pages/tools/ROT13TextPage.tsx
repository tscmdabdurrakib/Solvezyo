import { Helmet } from 'react-helmet';
import ROT13Text from '@/tools/text-string/rot13-text';

export default function ROT13TextPage() {
  return (
    <>
      <Helmet>
        <title>ROT13 Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Encode or decode text using ROT13 cipher. A simple letter substitution cipher that shifts letters by 13 positions." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ROT13 Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode/decode text using ROT13 cipher
          </p>
        </div>
        <ROT13Text />
      </div>
    </>
  );
}
