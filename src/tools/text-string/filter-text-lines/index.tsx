import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FilterTextLines() {
  const [inputText, setInputText] = useState<string>('apple\nbanana\ncherry\ndate\nelderberry\nfig\ngrape');
  const [filterType, setFilterType] = useState<string>('contains');
  const [filterValue, setFilterValue] = useState<string>('a');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into lines
    const lines = inputText.split('\n');
    
    if (!filterValue.trim()) {
      setOutput(inputText);
      return;
    }
    
    let filteredLines: string[] = [];
    
    for (const line of lines) {
      const lineToCheck = caseSensitive ? line : line.toLowerCase();
      const valueToCheck = caseSensitive ? filterValue : filterValue.toLowerCase();
      
      let matches = false;
      
      switch (filterType) {
        case 'contains':
          matches = lineToCheck.includes(valueToCheck);
          break;
        case 'not-contains':
          matches = !lineToCheck.includes(valueToCheck);
          break;
        case 'starts-with':
          matches = lineToCheck.startsWith(valueToCheck);
          break;
        case 'ends-with':
          matches = lineToCheck.endsWith(valueToCheck);
          break;
        case 'equals':
          matches = lineToCheck === valueToCheck;
          break;
        case 'not-equals':
          matches = lineToCheck !== valueToCheck;
          break;
        case 'regex':
          try {
            const regex = new RegExp(filterValue, caseSensitive ? 'g' : 'gi');
            matches = regex.test(line);
          } catch (e) {
            // Invalid regex, no matches
            matches = false;
          }
          break;
        default:
          matches = true;
      }
      
      if (matches) {
        filteredLines.push(line);
      }
    }
    
    setOutput(filteredLines.join('\n'));
  }, [inputText, filterType, filterValue, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Filtered text lines copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getLineCount = (text: string) => {
    if (!text) return 0;
    return text.split('\n').length;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Filter Text Lines</CardTitle>
          </div>
          <CardDescription>Filter lines of text based on various criteria</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
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
              <Label htmlFor="filter-type">Filter Type:</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="mt-2" data-testid="select-filter-type">
                  <SelectValue placeholder="Select filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="not-contains">Does not contain</SelectItem>
                  <SelectItem value="starts-with">Starts with</SelectItem>
                  <SelectItem value="ends-with">Ends with</SelectItem>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="not-equals">Does not equal</SelectItem>
                  <SelectItem value="regex">Regex pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-value">Filter Value:</Label>
              <Input
                id="filter-value"
                data-testid="input-filter-value"
                placeholder="Enter filter criteria..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Original Lines</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{getLineCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Filtered Lines</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{getLineCount(output)}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Filtered Text Lines:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Filtered text lines will appear here..."
            />
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <strong>Example:</strong> Filter lines containing "a" from "apple\nbanana\ncherry" → "apple\nbanana"
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

export default FilterTextLines;
