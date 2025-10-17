import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SortTextLines() {
  const [inputText, setInputText] = useState<string>('Zebra\nApple\nbanana\nCar\ndog\nElephant\nFish\ngrape\nHouse\nice');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    let lines = inputText.split('\n');
    
    // Remove empty lines if enabled
    if (removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }
    
    // Sort lines
    lines.sort((a, b) => {
      let compareA = caseSensitive ? a : a.toLowerCase();
      let compareB = caseSensitive ? b : b.toLowerCase();
      
      if (sortOrder === 'desc') {
        return compareB.localeCompare(compareA);
      }
      return compareA.localeCompare(compareB);
    });
    
    setOutput(lines.join('\n'));
  }, [inputText, sortOrder, caseSensitive, removeEmptyLines]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Sorted lines copied to clipboard",
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
            <ArrowUpDown className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Sort Text Lines</CardTitle>
          </div>
          <CardDescription>Sort text lines alphabetically in ascending or descending order</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text lines to sort..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
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
                  id="remove-empty-lines"
                  data-testid="checkbox-remove-empty"
                  checked={removeEmptyLines}
                  onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="remove-empty-lines">Remove empty lines</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Sorted Lines:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Sorted lines will appear here..."
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

export default SortTextLines;