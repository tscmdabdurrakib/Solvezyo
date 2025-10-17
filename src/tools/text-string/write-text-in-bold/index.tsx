import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Bold } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function WriteTextInBold() {
  const [inputText, setInputText] = useState<string>('Make your text stand out!\nBold formatting for emphasis\nPerfect for headlines and titles');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const boldMap = {
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜',
    'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
    'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
    'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
    's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const boldText = inputText.replace(/./g, (char) => {
      return boldMap[char] || char;
    });

    setOutput(boldText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Bold text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20">
          <div className="flex items-center justify-center gap-2">
            <Bold className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <CardTitle className="text-2xl">Write Text in Bold</CardTitle>
          </div>
          <CardDescription>Convert your text to bold Unicode characters</CardDescription>
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
            <Label htmlFor="output">𝗕𝗼𝗹𝗱 𝗧𝗲𝘅𝘁:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁 𝘄𝗶𝗹𝗹 𝗮𝗽𝗽𝗲𝗮𝗿 𝗵𝗲𝗿𝗲..."
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-950/20 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>𝗘𝘅𝗮𝗺𝗽𝗹𝗲:</strong> 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 "Hello World" 𝘁𝗼 "𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱" - 𝗽𝗲𝗿𝗳𝗲𝗰𝘁 𝗳𝗼𝗿 𝗲𝗺𝗽𝗵𝗮𝘀𝗶𝘀!
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

export default WriteTextInBold;