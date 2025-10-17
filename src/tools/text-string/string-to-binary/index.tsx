import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Binary } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function StringToBinary() {
  const [inputText, setInputText] = useState<string>('Hello World! 🌍 Welcome to ToolNexas');
  const [output, setOutput] = useState<string>('');
  const [byteCount, setByteCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setByteCount(0);
      return;
    }
    
    try {
      // Convert string to UTF-8 bytes then to binary
      const utf8Bytes = new TextEncoder().encode(inputText);
      const binaryArray = Array.from(utf8Bytes).map(byte => 
        byte.toString(2).padStart(8, '0')
      );
      
      setOutput(binaryArray.join(' '));
      setByteCount(utf8Bytes.length);
    } catch (error) {
      setOutput('Error converting text to binary');
      setByteCount(0);
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Binary representation copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20">
          <div className="flex items-center justify-center gap-2">
            <Binary className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <CardTitle className="text-2xl">Convert a String to Binary</CardTitle>
          </div>
          <CardDescription>Convert text to binary representation (UTF-8 encoded)</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to convert to binary..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter any text including Unicode characters and emojis
            </p>
          </div>

          <div className="text-center">
            <Card className="p-4 inline-block">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">{byteCount}</div>
              <div className="text-sm text-muted-foreground">Bytes</div>
            </Card>
          </div>

          <div>
            <Label htmlFor="output">Binary Representation:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-xs"
              placeholder="Binary representation will appear here..."
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Binary Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StringToBinary;
