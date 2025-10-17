import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Network, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function StringToNetstring() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  const encodeNetstring = (text: string): string => {
    try {
      const length = new TextEncoder().encode(text).length;
      return `${length}:${text},`;
    } catch (error) {
      return "Error encoding to netstring";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Netstring copied to clipboard",
    });
  };

  const resetConverter = () => {
    setInputText('');
  };

  const netstringOutput = encodeNetstring(inputText);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Network className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">String to Netstring</CardTitle>
            <CardDescription>
              Convert plain text to netstring format
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter text to convert to netstring
            </label>
            <Textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-32 w-full font-mono"
              rows={6}
              data-testid="input-text"
            />
            <p className="text-xs text-muted-foreground">
              Enter any text to convert to netstring format
            </p>
          </div>

          {inputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Netstring Output
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(netstringOutput)}
                  className="gap-2"
                  data-testid="button-copy-result"
                >
                  <Copy className="h-3 w-3" />
                  Copy Result
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="bg-background p-3 rounded border font-mono text-sm break-all" data-testid="text-netstring-output">
                  {netstringOutput || <span className="text-muted-foreground italic">No output</span>}
                </div>
              </div>
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2">What is Netstring Format?</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>• A netstring is: [byte length]:[string data],</p>
              <p>• Format: &lt;length&gt;:&lt;string&gt;,</p>
              <p>• Example: "hello" becomes "5:hello,"</p>
              <p>• Self-delimiting format for reliable data transmission</p>
              <p>• Used in network protocols and data serialization</p>
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
          Instant netstring conversion
        </div>
      </CardFooter>
    </Card>
  );
}

export default StringToNetstring;
