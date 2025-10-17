import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, CaseSensitive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ChangeStringCase() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas - Professional Tools & Solutions for Developers');
  const [caseType, setCaseType] = useState<string>('uppercase');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    let result = inputText;
    switch (caseType) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'titlecase':
        result = inputText.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        break;
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\w|\.\s*\w)/g, l => l.toUpperCase());
        break;
      case 'camelcase':
        result = inputText.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case 'pascalcase':
        result = inputText.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, '');
        break;
      case 'snakecase':
        result = inputText.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
        break;
      case 'kebabcase':
        result = inputText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        break;
      case 'alternating':
        result = inputText.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        break;
      case 'inverse':
        result = inputText.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        break;
      default:
        result = inputText;
    }
    setOutput(result);
  }, [inputText, caseType]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Converted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <CaseSensitive className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
            <CardTitle className="text-2xl">Change String Case</CardTitle>
          </div>
          <CardDescription>Convert text to different case formats with multiple options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="case-type">Case Type:</Label>
            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger id="case-type" data-testid="select-case-type" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uppercase">UPPERCASE</SelectItem>
                <SelectItem value="lowercase">lowercase</SelectItem>
                <SelectItem value="titlecase">Title Case</SelectItem>
                <SelectItem value="sentencecase">Sentence case</SelectItem>
                <SelectItem value="camelcase">camelCase</SelectItem>
                <SelectItem value="pascalcase">PascalCase</SelectItem>
                <SelectItem value="snakecase">snake_case</SelectItem>
                <SelectItem value="kebabcase">kebab-case</SelectItem>
                <SelectItem value="alternating">aLtErNaTiNg</SelectItem>
                <SelectItem value="inverse">iNVERSE cASE</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Choose the case format to convert your text
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to change case..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="output">Converted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Converted text will appear here..."
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

export default ChangeStringCase;
