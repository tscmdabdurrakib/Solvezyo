import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FilterStringLines() {
  const [inputText, setInputText] = useState<string>('apple\nbanana\napricot\ngrape\navocado\ncherry');
  const [filterText, setFilterText] = useState<string>('a');
  const [filterMode, setFilterMode] = useState<string>('contains');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    filterLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, filterText, filterMode, caseSensitive]);

  const filterLines = () => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    let filtered: string[] = [];

    const compareText = caseSensitive ? filterText : filterText.toLowerCase();

    filtered = lines.filter(line => {
      const compareLine = caseSensitive ? line : line.toLowerCase();
      
      switch (filterMode) {
        case 'contains':
          return compareLine.includes(compareText);
        case 'starts_with':
          return compareLine.startsWith(compareText);
        case 'ends_with':
          return compareLine.endsWith(compareText);
        case 'not_contains':
          return !compareLine.includes(compareText);
        case 'equals':
          return compareLine === compareText;
        default:
          return true;
      }
    });

    const result = filtered.length > 0 
      ? `Found ${filtered.length} matching line(s):\n\n${filtered.join('\n')}`
      : 'No matching lines found';
    
    setOutput(result);
  };

  const copyToClipboard = () => {
    if (output && !output.startsWith('No matching')) {
      const lines = output.split('\n\n')[1] || output;
      navigator.clipboard.writeText(lines);
      toast({
        title: "Copied!",
        description: "Filtered lines copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Filter String Lines</CardTitle>
          </div>
          <CardDescription>Filter text lines based on custom criteria</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (one per line):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text lines to filter..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-40 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="filter-text">Filter Text:</Label>
              <Input
                id="filter-text"
                data-testid="input-filter-text"
                placeholder="Enter text to filter by..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="filter-mode">Filter Mode:</Label>
              <Select value={filterMode} onValueChange={setFilterMode}>
                <SelectTrigger id="filter-mode" data-testid="select-filter-mode" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="starts_with">Starts With</SelectItem>
                  <SelectItem value="ends_with">Ends With</SelectItem>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="not_contains">Not Contains</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="case-sensitive"
              data-testid="checkbox-case-sensitive"
              checked={caseSensitive}
              onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
            />
            <Label htmlFor="case-sensitive" className="cursor-pointer">
              Case sensitive
            </Label>
          </div>

          <div>
            <Label>Filtered Result:</Label>
            <div className="mt-2 relative">
              <Textarea
                value={output}
                data-testid="output-result"
                readOnly
                className="min-h-40 bg-gray-50 dark:bg-gray-900"
                placeholder="Filtered lines will appear here..."
              />
              <Button
                onClick={copyToClipboard}
                data-testid="button-copy"
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                disabled={!output || output.startsWith('No matching')}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FilterStringLines;
