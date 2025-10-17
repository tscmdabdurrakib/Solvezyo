import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function JoinStrings() {
  const [inputText, setInputText] = useState<string>('apple\nbanana\norange\ngrape\nmango');
  const [separator, setSeparator] = useState<string>(', ');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    joinText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, separator]);

  const joinText = () => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n').filter(line => line.trim());
    const result = lines.join(separator);
    
    setOutput(result);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Joined text copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <Link className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Join Strings</CardTitle>
          </div>
          <CardDescription>Join multiple lines of text with a custom separator</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (one per line):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text lines to join..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-40 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter each item on a new line
            </p>
          </div>

          <div>
            <Label htmlFor="separator">Separator:</Label>
            <Input
              id="separator"
              data-testid="input-separator"
              placeholder="Enter separator (e.g., ', ', ' | ', '-')"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be inserted between each item
            </p>
          </div>

          <div>
            <Label>Joined Result:</Label>
            <div className="mt-2 relative">
              <Textarea
                value={output}
                data-testid="output-result"
                readOnly
                className="min-h-32 bg-gray-50 dark:bg-gray-900"
                placeholder="Joined result will appear here..."
              />
              <Button
                onClick={copyToClipboard}
                data-testid="button-copy"
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                disabled={!output}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JoinStrings;
