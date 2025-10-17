import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReplaceWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. The cat is also quick and brown.');
  const [findWord, setFindWord] = useState<string>('quick');
  const [replaceWord, setReplaceWord] = useState<string>('fast');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [wholeWordsOnly, setWholeWordsOnly] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (!findWord.trim()) {
      setOutput(inputText);
      return;
    }
    
    let result = inputText;
    const escapedFindWord = findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Build regex flags
    const flags = caseSensitive ? 'g' : 'gi';
    
    // Build regex pattern
    const pattern = wholeWordsOnly 
      ? `\\b${escapedFindWord}\\b`
      : escapedFindWord;
    
    try {
      const regex = new RegExp(pattern, flags);
      result = result.replace(regex, replaceWord);
    } catch (error) {
      // If regex fails, fallback to simple replacement
      result = inputText;
    }
    
    setOutput(result);
  }, [inputText, findWord, replaceWord, caseSensitive, wholeWordsOnly]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with replaced words copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Count replacements
  const countReplacements = () => {
    if (!findWord.trim() || !inputText) return 0;
    
    const escapedFindWord = findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const flags = caseSensitive ? 'g' : 'gi';
    const pattern = wholeWordsOnly 
      ? `\\b${escapedFindWord}\\b`
      : escapedFindWord;
    
    try {
      const regex = new RegExp(pattern, flags);
      const matches = inputText.match(regex);
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Replace Words in Text</CardTitle>
          </div>
          <CardDescription>Find and replace words in your text with advanced options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to find and replace words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="find-word">Find Word:</Label>
              <Input
                id="find-word"
                data-testid="input-find-word"
                placeholder="Word to find"
                value={findWord}
                onChange={(e) => setFindWord(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="replace-word">Replace With:</Label>
              <Input
                id="replace-word"
                data-testid="input-replace-word"
                placeholder="Replacement word"
                value={replaceWord}
                onChange={(e) => setReplaceWord(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="case-sensitive"
                data-testid="checkbox-case-sensitive"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="case-sensitive">Case sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="whole-words-only"
                data-testid="checkbox-whole-words"
                checked={wholeWordsOnly}
                onChange={(e) => setWholeWordsOnly(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="whole-words-only">Whole words only</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Replaced Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with replaced words will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {countReplacements()} replacement(s) made
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Options:</strong> Case sensitive matching and whole word boundaries for precise replacements.
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

export default ReplaceWordsInText;
