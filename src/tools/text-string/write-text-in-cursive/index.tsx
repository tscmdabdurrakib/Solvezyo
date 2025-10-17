import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, PenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function WriteTextinCursive() {
  const [inputText, setInputText] = useState<string>('Make your text beautiful!\nCursive formatting for elegant writing\nPerfect for signatures and artistic text');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const cursiveMap: { [key: string]: string } = {
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ',
    'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ',
    'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
    'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾',
    'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇',
    's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const cursiveText = inputText.replace(/./g, (char) => {
      return char in cursiveMap ? cursiveMap[char] : char;
    });

    setOutput(cursiveText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Cursive text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <PenLine className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Write Text in Cursive</CardTitle>
          </div>
          <CardDescription>Convert your text to elegant cursive Unicode characters</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">𝓒𝓾𝓻𝓼𝓲𝓿𝓮 𝓣𝓮𝔁𝓽:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="𝓒𝓾𝓻𝓼𝓲𝓿𝓮 𝓽𝓮𝔁𝓽 𝔀𝓲𝓵𝓵 𝓪𝓹𝓹𝓮𝓪𝓻 𝓱𝓮𝓻𝓮..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>𝓔𝔁𝓪𝓶𝓹𝓵𝓮:</strong> 𝓒𝓸𝓷𝓿𝓮𝓻𝓽 "Hello World" 𝓽𝓸 "𝓗𝓮𝓵𝓵𝓸 𝓦𝓸𝓻𝓵𝓭" - 𝓹𝓮𝓻𝓯𝓮𝓬𝓽 𝓯𝓸𝓻 𝓮𝓵𝓮𝓰𝓪𝓷𝓽 𝓽𝓮𝔁𝓽!
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

export default WriteTextinCursive;