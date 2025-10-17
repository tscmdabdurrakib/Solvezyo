import { Helmet } from 'react-helmet';
import Base64DecodeText from '@/tools/text-string/base64-decode-text';

export default function Base64DecodeTextPage() {
  return (
    <>
      <Helmet>
        <title>Base64 Decode Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Decode Base64 encoded text back to plain text. Fast and secure Base64 decoder." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Base64 Decode Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Decode Base64 encoded text back to plain text
          </p>
        </div>
        <Base64DecodeText />
      </div>
    </>
  );
}
