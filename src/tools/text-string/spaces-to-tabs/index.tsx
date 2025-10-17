import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SpacesToTabs() {
  const [inputText, setInputText] = useState<string>('Hello World    Welcome to ToolNexas    Professional Tools    Convert Spaces to Tabs');
  const [spacesPerTab, setSpacesPerTab] = useState<number>(4);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Replace consecutive spaces with tabs based on spacesPerTab setting
    const spacePattern = new RegExp(`\\s{${spacesPerTab}}`, 'g');
    const converted = inputText.replace(spacePattern, '\t');
    setOutput(converted);
  }, [inputText, spacesPerTab]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with tabs copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <ArrowRightLeft className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Convert Spaces to Tabs</CardTitle>
          </div>
          <CardDescription>Replace consecutive spaces with tab characters for better formatting</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="spaces-per-tab">Spaces per Tab:</Label>
            <Input
              id="spaces-per-tab"
              data-testid="spaces-per-tab"
              type="number"
              min="1"
              max="16"
              value={spacesPerTab}
              onChange={(e) => setSpacesPerTab(Number(e.target.value) || 4)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Number of consecutive spaces to replace with one tab (default: 4)
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with spaces..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter text with multiple spaces to convert them to tabs
            </p>
          </div>

          <div>
            <Label htmlFor="output">Converted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Text with tabs will appear here..."
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

export default SpacesToTabs;
