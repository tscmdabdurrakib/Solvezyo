import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Antenna } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertMorseCodeToString() {
  const [inputText, setInputText] = useState<string>('.... . .-.. .-.. --- / .-- --- .-. .-.. -.. -.-.-- / .-- . .-.. -.-. --- -- . / - --- / - --- --- .-.. -. . -..- .- ...');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const morseToTextMap: { [key: string]: string } = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
    '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9', '.-.-.-': '.', '--..--': ',', '..--..': '?',
    '.----.': "'", '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')',
    '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+',
    '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@',
    '/': ' '
  };

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      setError('');
      return;
    }
    
    try {
      // Split by forward slashes for word boundaries, then by spaces for letters
      const words = inputText.trim().split('/');
      const decodedWords = words.map(word => {
        const letters = word.trim().split(/\s+/);
        return letters.map(letter => {
          const trimmedLetter = letter.trim();
          if (!trimmedLetter) return '';
          
          if (morseToTextMap[trimmedLetter]) {
            return morseToTextMap[trimmedLetter];
          } else {
            throw new Error(`Unknown Morse code: ${trimmedLetter}`);
          }
        }).join('');
      });
      
      setOutput(decodedWords.join(' '));
      setError('');
    } catch (err) {
      setError('Invalid Morse code format. Please check your input.');
      setOutput('');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Decoded text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Antenna className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Convert Morse Code to a String</CardTitle>
          </div>
          <CardDescription>Decode Morse code back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Morse Code:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter Morse code to decode to text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use spaces between letters and forward slashes (/) between words
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div>
            <Label htmlFor="output">Decoded Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Decoded text will appear here..."
            />
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

export default ConvertMorseCodeToString;
