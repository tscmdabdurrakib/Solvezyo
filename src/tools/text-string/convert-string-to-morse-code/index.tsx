import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertStringToMorseCode() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas - Professional Tools & Solutions');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const morseCodeMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const result = inputText
      .toUpperCase()
      .split('')
      .map(char => {
        if (morseCodeMap[char]) {
          return morseCodeMap[char];
        } else if (char === ' ') {
          return '/';
        } else {
          return char; // Keep unknown characters as is
        }
      })
      .join(' ');
    
    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Morse code copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <div className="flex items-center justify-center gap-2">
            <Radio className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Convert a String to Morse Code</CardTitle>
          </div>
          <CardDescription>Convert text to Morse code using dots and dashes</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to convert to Morse code..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports letters, numbers, and common punctuation marks
            </p>
          </div>

          <div>
            <Label htmlFor="output">Morse Code Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Morse code will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Dots (.), dashes (-), spaces between letters, forward slashes (/) for word breaks
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConvertStringToMorseCode;
