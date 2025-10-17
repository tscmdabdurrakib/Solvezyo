import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Split } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SplitText() {
  const [inputText, setInputText] = useState<string>('apple,banana,cherry,date,elderberry,fig,grape');
  const [splitType, setSplitType] = useState<string>('comma');
  const [customDelimiter, setCustomDelimiter] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    let delimiter = '';
    
    switch (splitType) {
      case 'comma':
        delimiter = ',';
        break;
      case 'space':
        delimiter = ' ';
        break;
      case 'newline':
        delimiter = '\n';
        break;
      case 'tab':
        delimiter = '\t';
        break;
      case 'semicolon':
        delimiter = ';';
        break;
      case 'pipe':
        delimiter = '|';
        break;
      case 'custom':
        delimiter = customDelimiter;
        break;
      default:
        delimiter = ',';
    }
    
    if (!delimiter && splitType === 'custom') {
      setOutput('Please enter a custom delimiter');
      return;
    }
    
    try {
      const parts = inputText.split(delimiter);
      const numberedParts = parts.map((part, index) => `${index + 1}. ${part.trim()}`);
      setOutput(numberedParts.join('\n'));
    } catch (err) {
      setOutput('Error splitting text');
    }
  }, [inputText, splitType, customDelimiter]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Split text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="flex items-center justify-center gap-2">
            <Split className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Split Text</CardTitle>
          </div>
          <CardDescription>Split text into separate lines using various delimiters</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="split-type">Split By:</Label>
              <Select value={splitType} onValueChange={setSplitType}>
                <SelectTrigger id="split-type" data-testid="select-split-type" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comma">Comma (,)</SelectItem>
                  <SelectItem value="space">Space</SelectItem>
                  <SelectItem value="newline">Newline</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                  <SelectItem value="semicolon">Semicolon (;)</SelectItem>
                  <SelectItem value="pipe">Pipe (|)</SelectItem>
                  <SelectItem value="custom">Custom Delimiter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {splitType === 'custom' && (
              <div>
                <Label htmlFor="custom-delimiter">Custom Delimiter:</Label>
                <Input
                  id="custom-delimiter"
                  data-testid="input-custom-delimiter"
                  placeholder="Enter custom delimiter..."
                  value={customDelimiter}
                  onChange={(e) => setCustomDelimiter(e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to split..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Text will be split by the selected delimiter
            </p>
          </div>

          <div>
            <Label htmlFor="output">Split Result:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Split text will appear here..."
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

export default SplitText;
