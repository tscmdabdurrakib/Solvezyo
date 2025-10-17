import { Helmet } from 'react-helmet';
import ReverseString from '@/tools/text-string/reverse-string';

export default function ReverseStringPage() {
  return (
    <>
      <Helmet>
        <title>Reverse a String - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Reverse your text character by character instantly. Online tool to flip strings backward with Unicode character support." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reverse a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Reverse your text character by character
          </p>
        </div>
        <ReverseString />
      </div>
    </>
  );
}
