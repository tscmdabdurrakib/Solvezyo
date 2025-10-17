import { Helmet } from 'react-helmet';
import StringToAscii from '@/tools/text-string/string-to-ascii';

export default function StringToAsciiPage() {
  return (
    <>
      <Helmet>
        <title>Convert a String to ASCII - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert text characters to ASCII code values instantly. Online tool for encoding text to ASCII format." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Convert a String to ASCII
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text characters to ASCII code values
          </p>
        </div>
        <StringToAscii />
      </div>
    </>
  );
}
