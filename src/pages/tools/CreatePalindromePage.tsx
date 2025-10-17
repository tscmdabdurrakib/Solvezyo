import { Helmet } from 'react-helmet';
import CreatePalindrome from '@/tools/text-string/create-palindrome';

export default function CreatePalindromePage() {
  return (
    <>
      <Helmet>
        <title>Create Palindrome - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Generate palindromes from your text using different methods. Create text that reads the same forwards and backwards." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Create Palindrome
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate palindromes from your text using different methods
          </p>
        </div>
        <CreatePalindrome />
      </div>
    </>
  );
}
