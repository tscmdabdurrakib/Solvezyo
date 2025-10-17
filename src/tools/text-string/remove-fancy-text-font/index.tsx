import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveFancyTextFont() {
  const [inputText, setInputText] = useState<string>('𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝!\n𝑇ℎ𝑖𝑠 𝑖𝑠 𝑓𝑎𝑛𝑐𝑦 𝑡𝑒𝑥𝑡\n𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 𝚝𝚎𝚡𝚝');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  // Unicode character ranges for fancy fonts
  const fancyFontRanges = {
    // Mathematical Bold
    'bold': { start: 0x1D400, end: 0x1D433, offset: 65 }, // A-Z
    'boldLower': { start: 0x1D41A, end: 0x1D433, offset: 97 }, // a-z
    'boldNumbers': { start: 0x1D7CE, end: 0x1D7D7, offset: 48 }, // 0-9
    
    // Mathematical Italic
    'italic': { start: 0x1D434, end: 0x1D467, offset: 65 }, // A-Z
    'italicLower': { start: 0x1D44E, end: 0x1D467, offset: 97 }, // a-z
    
    // Mathematical Monospace
    'mono': { start: 0x1D670, end: 0x1D689, offset: 65 }, // A-Z
    'monoLower': { start: 0x1D68A, end: 0x1D6A3, offset: 97 }, // a-z
    'monoNumbers': { start: 0x1D7F6, end: 0x1D7FF, offset: 48 }, // 0-9
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let normalizedText = inputText;

    // Convert each character back to normal
    normalizedText = normalizedText.replace(/./g, (char) => {
      const charCode = char.codePointAt(0);
      if (!charCode) return char;

      // Check each fancy font range
      for (const [key, range] of Object.entries(fancyFontRanges)) {
        if (charCode >= range.start && charCode <= range.end) {
          const normalCharCode = charCode - range.start + range.offset;
          return String.fromCharCode(normalCharCode);
        }
      }

      // Handle special italic characters
      const italicMap = {
        'ℎ': 'h', // Special italic h
        '𝑔': 'g', // Special italic g
      };
      
      if (italicMap[char]) {
        return italicMap[char];
      }

      return char;
    });

    setOutput(normalizedText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Normal text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eraser className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Remove Fancy Text Font</CardTitle>
          </div>
          <CardDescription>Convert fancy Unicode text back to normal characters</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Fancy Text Input:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter fancy text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Normal Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Normal text will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> Convert "𝐇𝐞𝐥𝐥𝐨" back to "Hello", "𝑇ℎ𝑖𝑠" to "This", or "𝙼𝚘𝚗𝚘" to "Mono"
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

export default RemoveFancyTextFont;