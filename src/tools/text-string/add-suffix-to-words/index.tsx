import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddSuffixToWords() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog.');
  const [suffix, setSuffix] = useState<string>('_ed');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const suffixValue = suffix || '';
    
    const processText = (text: string) => {
      return text.replace(/\b\w+\b/g, (word) => {
        return `${word}${suffixValue}`;
      });
    };

    setOutput(processText(inputText));
  }, [inputText, suffix]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with suffix added to words copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetSuffixes = [
    { name: "_ed", value: "_ed" },
    { name: "_ing", value: "_ing" },
    { name: "_er", value: "_er" },
    { name: "_est", value: "_est" },
    { name: "_ly", value: "_ly" },
    { name: "_tion", value: "_tion" },
    { name: "_able", value: "_able" },
    { name: "_ful", value: "_ful" },
  ];

  const applyPreset = (value: string) => {
    setSuffix(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Add a Suffix to Words</CardTitle>
          </div>
          <CardDescription>Add a suffix to the end of each word in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add suffix to words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="suffix">Suffix to Add:</Label>
            <Input
              id="suffix"
              data-testid="input-suffix"
              placeholder="_ed"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Quick Presets:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetSuffixes.map((preset) => (
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
            <Label htmlFor="output">Text with Suffix Added to Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with suffix added to words will appear here..."
            />
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-lg">
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Example:</strong> Adding "_ed" suffix to "Hello World" → "Hello_ed World_ed"
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

export default AddSuffixToWords;
