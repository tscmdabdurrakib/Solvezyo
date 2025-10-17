import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, AlignJustify } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SortParagraphsInText() {
  const [inputText, setInputText] = useState<string>('This is the third paragraph with some content.\n\nHere is the first paragraph that should come first.\n\nSecond paragraph is in the middle.\n\nLast paragraph comes at the end with final content.');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [removeEmptyParagraphs, setRemoveEmptyParagraphs] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    let paragraphs = inputText.split(/\n\s*\n/);
    
    // Remove empty paragraphs if enabled
    if (removeEmptyParagraphs) {
      paragraphs = paragraphs.filter(paragraph => paragraph.trim().length > 0);
    }
    
    // Sort paragraphs based on their first line or full content
    paragraphs.sort((a, b) => {
      const firstLineA = a.split('\n')[0].trim();
      const firstLineB = b.split('\n')[0].trim();
      
      let compareA = caseSensitive ? firstLineA : firstLineA.toLowerCase();
      let compareB = caseSensitive ? firstLineB : firstLineB.toLowerCase();
      
      if (sortOrder === 'desc') {
        return compareB.localeCompare(compareA);
      }
      return compareA.localeCompare(compareB);
    });
    
    setOutput(paragraphs.join('\n\n'));
  }, [inputText, sortOrder, caseSensitive, removeEmptyParagraphs]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Sorted paragraphs copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignJustify className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Sort Paragraphs in Text</CardTitle>
          </div>
          <CardDescription>Sort paragraphs alphabetically based on their first line</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with paragraphs to sort..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paragraphs are separated by double line breaks and sorted by their first line
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sort-order">Sort Order:</Label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="mt-2" data-testid="select-sort-order">
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending (A-Z)</SelectItem>
                  <SelectItem value="desc">Descending (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 mt-2">
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
                  id="remove-empty-paragraphs"
                  data-testid="checkbox-remove-empty"
                  checked={removeEmptyParagraphs}
                  onChange={(e) => setRemoveEmptyParagraphs(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="remove-empty-paragraphs">Remove empty paragraphs</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Sorted Paragraphs:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Sorted paragraphs will appear here..."
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

export default SortParagraphsInText;