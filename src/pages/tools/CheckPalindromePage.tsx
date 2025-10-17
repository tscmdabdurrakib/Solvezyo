import { Helmet } from 'react-helmet';
import CheckPalindrome from '@/tools/text-string/check-palindrome';

export default function CheckPalindromePage() {
  return (
    <>
      <Helmet>
        <title>Check Palindrome - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Verify if your text is a palindrome with customizable options. Check if text reads the same forwards and backwards." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Check Palindrome
          </h1>
          <p className="text-muted-foreground mt-2">
            Verify if your text is a palindrome with customizable options
          </p>
        </div>
        <CheckPalindrome />
      </div>
    </>
  );
}
