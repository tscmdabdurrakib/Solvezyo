import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ListOrdered } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SortSentencesInText() {
  const [inputText, setInputText] = useState<string>('This is the third sentence. Here comes the first sentence! Second sentence follows. Last sentence ends with a question mark?');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [preserveWhitespace, setPreserveWhitespace] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split sentences by common sentence endings
    const sentences = inputText.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim().length > 0);
    
    // Sort sentences
    const sortedSentences = [...sentences].sort((a, b) => {
      let compareA = caseSensitive ? a.trim() : a.trim().toLowerCase();
      let compareB = caseSensitive ? b.trim() : b.trim().toLowerCase();
      
      if (sortOrder === 'desc') {
        return compareB.localeCompare(compareA);
      }
      return compareA.localeCompare(compareB);
    });
    
    // Join sentences back together
    const joinChar = preserveWhitespace ? ' ' : ' ';
    setOutput(sortedSentences.join(joinChar));
  }, [inputText, sortOrder, caseSensitive, preserveWhitespace]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Sorted sentences copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <div className="flex items-center justify-center gap-2">
            <ListOrdered className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Sort Sentences in Text</CardTitle>
          </div>
          <CardDescription>Sort sentences within your text alphabetically</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with sentences to sort..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Sentences are detected by periods, exclamation marks, and question marks
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
                  id="preserve-whitespace"
                  data-testid="checkbox-preserve-whitespace"
                  checked={preserveWhitespace}
                  onChange={(e) => setPreserveWhitespace(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-whitespace">Preserve spacing</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Sorted Sentences:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Sorted sentences will appear here..."
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

export default SortSentencesInText;