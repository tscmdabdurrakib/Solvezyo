import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FindAndReplaceText() {
  const [inputText, setInputText] = useState<string>('Hello world! This is a sample text. Hello everyone in this world. The world is beautiful and hello to all.');
  const [findText, setFindText] = useState<string>('world');
  const [replaceText, setReplaceText] = useState<string>('universe');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [wholeWords, setWholeWords] = useState<boolean>(false);
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [matchCount, setMatchCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText || !findText) {
      setOutput(inputText);
      setMatchCount(0);
      return;
    }

    try {
      let searchPattern: string | RegExp = findText;
      
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        searchPattern = new RegExp(findText, flags);
      } else {
        if (wholeWords) {
          const escapedText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const flags = caseSensitive ? 'g' : 'gi';
          searchPattern = new RegExp(`\\b${escapedText}\\b`, flags);
        } else {
          const flags = caseSensitive ? 'g' : 'gi';
          const escapedText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          searchPattern = new RegExp(escapedText, flags);
        }
      }

      // Count matches
      const matches = inputText.match(searchPattern);
      setMatchCount(matches ? matches.length : 0);

      // Replace text
      const result = inputText.replace(searchPattern, replaceText);
      setOutput(result);
    } catch (error) {
      // If regex is invalid, treat as literal text
      setOutput(inputText);
      setMatchCount(0);
    }
  }, [inputText, findText, replaceText, caseSensitive, wholeWords, useRegex]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with replacements copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const commonReplacements = [
    { name: "Spaces → Underscores", find: " ", replace: "_" },
    { name: "Newlines → Spaces", find: "\\n", replace: " ", regex: true },
    { name: "Multiple Spaces → Single", find: "\\s+", replace: " ", regex: true },
    { name: "Remove Numbers", find: "\\d+", replace: "", regex: true },
    { name: "Remove Punctuation", find: "[.,!?;:]", replace: "", regex: true },
    { name: "Hello → Hi", find: "Hello", replace: "Hi" },
  ];

  const applyCommonReplacement = (replacement: any) => {
    setFindText(replacement.find);
    setReplaceText(replacement.replace);
    setUseRegex(replacement.regex || false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <Search className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Find and Replace Text</CardTitle>
          </div>
          <CardDescription>Find and replace text with support for case sensitivity, whole words, and regular expressions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to search and replace..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="find-text">Find Text:</Label>
              <Input
                id="find-text"
                data-testid="input-find"
                placeholder="Text to find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="replace-text">Replace With:</Label>
              <Input
                id="replace-text"
                data-testid="input-replace"
                placeholder="Replacement text..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="case-sensitive"
                checked={caseSensitive}
                onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
              />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="whole-words"
                checked={wholeWords}
                onCheckedChange={(checked) => setWholeWords(checked as boolean)}
              />
              <Label htmlFor="whole-words">Whole Words Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="use-regex"
                checked={useRegex}
                onCheckedChange={(checked) => setUseRegex(checked as boolean)}
              />
              <Label htmlFor="use-regex">Use Regular Expressions</Label>
            </div>
          </div>

          <div>
            <Label>Common Replacements:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {commonReplacements.map((replacement, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => applyCommonReplacement(replacement)}
                  className="text-xs justify-start"
                >
                  {replacement.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="output">Result:</Label>
              <span className="text-sm text-muted-foreground">
                {matchCount} match{matchCount !== 1 ? 'es' : ''} found
              </span>
            </div>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with replacements will appear here..."
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Example:</strong> Find "world" and replace with "universe". Use regex for advanced patterns like "\\d+" to find numbers.
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

export default FindAndReplaceText;