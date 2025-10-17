import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddPrefixToWords() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog.');
  const [prefix, setPrefix] = useState<string>('pre_');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const prefixValue = prefix || '';
    
    const processText = (text: string) => {
      return text.replace(/\b\w+\b/g, (word) => {
        return `${prefixValue}${word}`;
      });
    };

    setOutput(processText(inputText));
  }, [inputText, prefix]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with prefix added to words copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetPrefixes = [
    { name: "Pre_", value: "pre_" },
    { name: "Un_", value: "un_" },
    { name: "Re_", value: "re_" },
    { name: "Ex_", value: "ex_" },
    { name: "Sub_", value: "sub_" },
    { name: "Anti_", value: "anti_" },
    { name: "Over_", value: "over_" },
    { name: "Under_", value: "under_" },
  ];

  const applyPreset = (value: string) => {
    setPrefix(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Add a Prefix to Words</CardTitle>
          </div>
          <CardDescription>Add a prefix to the beginning of each word in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add prefix to words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="prefix">Prefix to Add:</Label>
            <Input
              id="prefix"
              data-testid="input-prefix"
              placeholder="pre_"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Quick Presets:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetPrefixes.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.value)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Prefix Added to Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with prefix added to words will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> Adding "pre_" prefix to "Hello World" → "pre_Hello pre_World"
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

export default AddPrefixToWords;
