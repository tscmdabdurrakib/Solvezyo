import { Helmet } from 'react-helmet';
import Base64EncodeText from '@/tools/text-string/base64-encode-text';

export default function Base64EncodeTextPage() {
  return (
    <>
      <Helmet>
        <title>Base64-encode Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Encode text to Base64 format for data transmission. Perfect for APIs and data embedding." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Base64-encode Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode text to Base64 format for data transmission
          </p>
        </div>
        <Base64EncodeText />
      </div>
    </>
  );
}
