import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ChangeTextCase() {
  const [inputText, setInputText] = useState<string>('Change Text Case Tool\nSupports multiple case transformations\nPerfect for text formatting needs');
  const [output, setOutput] = useState<string>('');
  const [caseType, setCaseType] = useState<string>('uppercase');
  const { toast } = useToast();

  const transformCase = (text: string, type: string): string => {
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'title':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'sentence':
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => 
          c.toUpperCase()
        );
      case 'camel':
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      case 'pascal':
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
          return word.toUpperCase();
        }).replace(/\s+/g, '');
      case 'snake':
        return text.toLowerCase().replace(/\s+/g, '_');
      case 'kebab':
        return text.toLowerCase().replace(/\s+/g, '-');
      default:
        return text;
    }
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const transformedText = transformCase(inputText, caseType);
    setOutput(transformedText);
  }, [inputText, caseType]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Transformed text copied to clipboard",
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
            <Type className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Change Text Case</CardTitle>
          </div>
          <CardDescription>Transform text into different case formats</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="case-type">Case Type:</Label>
            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select case type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uppercase">UPPERCASE</SelectItem>
                <SelectItem value="lowercase">lowercase</SelectItem>
                <SelectItem value="title">Title Case</SelectItem>
                <SelectItem value="sentence">Sentence case</SelectItem>
                <SelectItem value="camel">camelCase</SelectItem>
                <SelectItem value="pascal">PascalCase</SelectItem>
                <SelectItem value="snake">snake_case</SelectItem>
                <SelectItem value="kebab">kebab-case</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
            <Label htmlFor="output">Transformed Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Transformed text will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Example:</strong> Convert "hello world" to "HELLO WORLD", "Hello World", or "helloWorld" based on your selection.
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

export default ChangeTextCase;