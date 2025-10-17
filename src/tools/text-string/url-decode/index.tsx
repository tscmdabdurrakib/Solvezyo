import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Unlink, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UrlDecode() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  const decodeUrl = (text: string): string => {
    try {
      return decodeURIComponent(text);
    } catch (error) {
      return "Invalid URL encoded string";
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

  const decodedOutput = decodeUrl(inputText);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Unlink className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">URL Decoder</CardTitle>
            <CardDescription>
              Convert URL-encoded text back to readable format
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter URL-encoded text to decode
            </label>
            <Textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your URL-encoded text here..."
              className="min-h-32 w-full font-mono"
              rows={6}
              data-testid="input-url-encoded-text"
            />
            <p className="text-xs text-muted-foreground">
              Enter URL-encoded text (with %20 and other escape sequences)
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
            <h4 className="font-medium mb-2">How URL Decoding Works:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>• Converts %20 back to spaces</p>
              <p>• Converts %XX hex codes back to special characters</p>
              <p>• Restores original text from URL-encoded format</p>
              <p>• Perfect for reading query parameters and URL data</p>
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
          Instant URL decoding
        </div>
      </CardFooter>
    </Card>
  );
}

export default UrlDecode;
