import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function VisualizeTextStructure() {
  const [inputText, setInputText] = useState<string>('Hello World!\nThis is a sample text.\nWith multiple lines.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    const totalChars = inputText.length;
    const totalWords = inputText.split(/\s+/).filter(w => w).length;
    const totalLines = lines.length;
    const totalParagraphs = inputText.split(/\n\s*\n/).filter(p => p.trim()).length;

    let structure = '📊 TEXT STRUCTURE ANALYSIS\n';
    structure += '═'.repeat(50) + '\n\n';
    structure += `📝 Total Characters: ${totalChars}\n`;
    structure += `📖 Total Words: ${totalWords}\n`;
    structure += `📄 Total Lines: ${totalLines}\n`;
    structure += `📑 Total Paragraphs: ${totalParagraphs}\n\n`;
    structure += '═'.repeat(50) + '\n';
    structure += '📋 LINE-BY-LINE BREAKDOWN\n';
    structure += '═'.repeat(50) + '\n\n';

    lines.forEach((line, index) => {
      const wordCount = line.split(/\s+/).filter(w => w).length;
      const charCount = line.length;
      structure += `Line ${index + 1}: [${charCount} chars, ${wordCount} words]\n`;
      structure += `├─ "${line}"\n\n`;
    });

    setOutput(structure);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text structure analysis copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Visualize Text Structure</CardTitle>
          </div>
          <CardDescription>Analyze and visualize the structure of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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
            <Label htmlFor="output">Structure Analysis:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-96 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              placeholder="Text structure visualization will appear here..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Example:</strong> Get detailed statistics about characters, words, lines, and paragraphs in your text
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

export default VisualizeTextStructure;
