import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SortStrings() {
  const [inputText, setInputText] = useState<string>('Zebra\nApple\nMango\nBanana\nCherry');
  const [sortOrder, setSortOrder] = useState<string>('ascending');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    
    let sortedLines = [...lines];
    
    if (sortOrder === 'ascending') {
      sortedLines.sort((a, b) => {
        if (caseSensitive) {
          return a.localeCompare(b);
        }
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    } else if (sortOrder === 'descending') {
      sortedLines.sort((a, b) => {
        if (caseSensitive) {
          return b.localeCompare(a);
        }
        return b.toLowerCase().localeCompare(a.toLowerCase());
      });
    } else if (sortOrder === 'length-asc') {
      sortedLines.sort((a, b) => a.length - b.length);
    } else if (sortOrder === 'length-desc') {
      sortedLines.sort((a, b) => b.length - a.length);
    } else if (sortOrder === 'reverse') {
      sortedLines.reverse();
    }
    
    setOutput(sortedLines.join('\n'));
  }, [inputText, sortOrder, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Sorted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <ArrowUpDown className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Sort Strings</CardTitle>
          </div>
          <CardDescription>Sort multiple lines of text with various options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (one line per row):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to sort..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.split('\n').filter(line => line.trim() !== '').length} lines
            </p>
          </div>

          <div>
            <Label htmlFor="sort-order">Sort Order:</Label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger id="sort-order" data-testid="select-sort-order" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascending">Ascending (A-Z)</SelectItem>
                <SelectItem value="descending">Descending (Z-A)</SelectItem>
                <SelectItem value="length-asc">By Length (Shortest First)</SelectItem>
                <SelectItem value="length-desc">By Length (Longest First)</SelectItem>
                <SelectItem value="reverse">Reverse Order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="case-sensitive"
              data-testid="checkbox-case-sensitive"
              checked={caseSensitive}
              onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
            />
            <Label htmlFor="case-sensitive" className="text-sm cursor-pointer">
              Case Sensitive Sorting
            </Label>
          </div>

          <div>
            <Label htmlFor="output">Sorted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Sorted text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {output.split('\n').filter(line => line.trim() !== '').length} lines sorted
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

export default SortStrings;
