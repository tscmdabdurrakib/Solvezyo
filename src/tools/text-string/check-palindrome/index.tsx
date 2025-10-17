import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CheckPalindrome() {
  const [inputText, setInputText] = useState<string>('A man a plan a canal Panama');
  const [ignoreCase, setIgnoreCase] = useState<boolean>(true);
  const [ignoreSpaces, setIgnoreSpaces] = useState<boolean>(true);
  const [ignorePunctuation, setIgnorePunctuation] = useState<boolean>(true);
  const [result, setResult] = useState<{isPalindrome: boolean, cleanedText: string, reversedText: string}>({
    isPalindrome: false,
    cleanedText: '',
    reversedText: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setResult({isPalindrome: false, cleanedText: '', reversedText: ''});
      return;
    }
    
    let cleanedText = inputText;
    
    // Apply cleaning options
    if (ignoreCase) {
      cleanedText = cleanedText.toLowerCase();
    }
    if (ignoreSpaces) {
      cleanedText = cleanedText.replace(/\s+/g, '');
    }
    if (ignorePunctuation) {
      cleanedText = cleanedText.replace(/[^\w\s]/g, '');
    }
    
    const reversedText = cleanedText.split('').reverse().join('');
    const isPalindrome = cleanedText === reversedText;
    
    setResult({
      isPalindrome,
      cleanedText,
      reversedText
    });
  }, [inputText, ignoreCase, ignoreSpaces, ignorePunctuation]);

  const copyResult = async () => {
    const resultText = `Original: ${inputText}\nCleaned: ${result.cleanedText}\nReversed: ${result.reversedText}\nIs Palindrome: ${result.isPalindrome ? 'Yes' : 'No'}`;
    
    try {
      await navigator.clipboard.writeText(resultText);
      toast({
        title: "Copied!",
        description: "Palindrome check result copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            {result.isPalindrome ? (
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            )}
            <CardTitle className="text-2xl">Check a Palindrome</CardTitle>
          </div>
          <CardDescription>Verify if your text is a palindrome with customizable options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-case"
                checked={ignoreCase}
                onCheckedChange={setIgnoreCase}
                data-testid="switch-ignore-case"
              />
              <Label htmlFor="ignore-case" className="text-sm">Ignore Case</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-spaces"
                checked={ignoreSpaces}
                onCheckedChange={setIgnoreSpaces}
                data-testid="switch-ignore-spaces"
              />
              <Label htmlFor="ignore-spaces" className="text-sm">Ignore Spaces</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-punctuation"
                checked={ignorePunctuation}
                onCheckedChange={setIgnorePunctuation}
                data-testid="switch-ignore-punctuation"
              />
              <Label htmlFor="ignore-punctuation" className="text-sm">Ignore Punctuation</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to check if it's a palindrome..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          {inputText.trim() && (
            <div className={`p-4 rounded-lg border-2 ${result.isPalindrome 
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' 
              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {result.isPalindrome ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <span className={`font-semibold ${result.isPalindrome 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
                }`}>
                  {result.isPalindrome ? 'Yes, this is a palindrome!' : 'No, this is not a palindrome.'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div><strong>Original:</strong> {inputText}</div>
                <div><strong>Cleaned:</strong> {result.cleanedText}</div>
                <div><strong>Reversed:</strong> {result.reversedText}</div>
              </div>
            </div>
          )}

          <Button
            onClick={copyResult}
            data-testid="button-copy"
            className="w-full"
            disabled={!inputText.trim()}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckPalindrome;
