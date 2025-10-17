import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Network, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function NetstringToString() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  const decodeNetstring = (netstring: string): string => {
    try {
      const colonIndex = netstring.indexOf(':');
      if (colonIndex === -1) {
        return "Error: Invalid netstring format (missing colon)";
      }
      
      const length = parseInt(netstring.substring(0, colonIndex), 10);
      if (isNaN(length)) {
        return "Error: Invalid length in netstring";
      }
      
      const dataStart = colonIndex + 1;
      const encoder = new TextEncoder();
      let accumulated = '';
      let byteCount = 0;
      
      // Iterate over code points and accumulate until we reach the byte length
      for (const char of netstring.slice(dataStart)) {
        const testString = accumulated + char;
        const testBytes = encoder.encode(testString).length;
        
        if (testBytes > length) {
          break;
        }
        
        accumulated += char;
        byteCount = testBytes;
      }
      
      if (byteCount !== length) {
        return "Error: Byte length mismatch";
      }
      
      const commaIndex = dataStart + accumulated.length;
      if (netstring[commaIndex] !== ',') {
        return "Error: Invalid netstring format (missing comma)";
      }
      
      return accumulated;
    } catch (error) {
      return "Error: Could not decode netstring";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Decoded text copied to clipboard",
    });
  };

  const resetConverter = () => {
    setInputText('');
  };

  const decodedOutput = decodeNetstring(inputText);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Network className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Netstring to String</CardTitle>
            <CardDescription>
              Convert netstring format back to plain text
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter netstring to decode
            </label>
            <Textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste netstring here (e.g., 5:hello,)"
              className="min-h-32 w-full font-mono"
              rows={6}
              data-testid="input-text"
            />
            <p className="text-xs text-muted-foreground">
              Enter a valid netstring in format: length:string,
            </p>
          </div>

          {inputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Decoded Output
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(decodedOutput)}
                  className="gap-2"
                  data-testid="button-copy-result"
                >
                  <Copy className="h-3 w-3" />
                  Copy Result
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="bg-background p-3 rounded border font-mono text-sm break-all" data-testid="text-decoded-output">
                  {decodedOutput || <span className="text-muted-foreground italic">No output</span>}
                </div>
              </div>
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2">How Netstring Decoding Works:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>• Parses format: &lt;length&gt;:&lt;string&gt;,</p>
              <p>• Extracts the byte length before the colon</p>
              <p>• Reads exactly that many bytes after the colon</p>
              <p>• Verifies the trailing comma for validation</p>
              <p>• Example: "5:hello," returns "hello"</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Instant netstring decoding
        </div>
      </CardFooter>
    </Card>
  );
}

export default NetstringToString;
