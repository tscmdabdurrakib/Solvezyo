import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FilterWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog');
  const [filterType, setFilterType] = useState<string>('contains');
  const [filterValue, setFilterValue] = useState<string>('o');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into words while preserving whitespace
    const words = inputText.split(/(\s+)/);
    
    if (!filterValue.trim()) {
      setOutput(inputText);
      return;
    }
    
    let filteredWords: string[] = [];
    
    for (const word of words) {
      // Keep whitespace as is
      if (/\s/.test(word)) {
        filteredWords.push(word);
        continue;
      }
      
      const wordToCheck = caseSensitive ? word : word.toLowerCase();
      const valueToCheck = caseSensitive ? filterValue : filterValue.toLowerCase();
      
      // Remove punctuation for comparison but keep original word
      const cleanWord = wordToCheck.replace(/[^\w]/g, '');
      
      let matches = false;
      
      switch (filterType) {
        case 'contains':
          matches = cleanWord.includes(valueToCheck);
          break;
        case 'not-contains':
          matches = !cleanWord.includes(valueToCheck);
          break;
        case 'starts-with':
          matches = cleanWord.startsWith(valueToCheck);
          break;
        case 'ends-with':
          matches = cleanWord.endsWith(valueToCheck);
          break;
        case 'equals':
          matches = cleanWord === valueToCheck;
          break;
        case 'not-equals':
          matches = cleanWord !== valueToCheck;
          break;
        case 'length-greater':
          const minLength = parseInt(filterValue) || 0;
          matches = cleanWord.length > minLength;
          break;
        case 'length-less':
          const maxLength = parseInt(filterValue) || 0;
          matches = cleanWord.length < maxLength;
          break;
        case 'regex':
          try {
            const regex = new RegExp(filterValue, caseSensitive ? 'g' : 'gi');
            matches = regex.test(cleanWord);
          } catch (e) {
            // Invalid regex, no matches
            matches = false;
          }
          break;
        default:
          matches = true;
      }
      
      if (matches) {
        filteredWords.push(word);
      }
    }
    
    // Clean up extra spaces
    const result = filteredWords.join('').replace(/\s+/g, ' ').trim();
    setOutput(result);
  }, [inputText, filterType, filterValue, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Filtered words copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getWordCount = (text: string) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Filter Words in Text</CardTitle>
          </div>
          <CardDescription>Filter words from your text based on various criteria</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to filter words from..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
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
                  <SelectItem value="length-greater">Length greater than</SelectItem>
                  <SelectItem value="length-less">Length less than</SelectItem>
                  <SelectItem value="regex">Regex pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-value">Filter Value:</Label>
              <Input
                id="filter-value"
                data-testid="input-filter-value"
                placeholder={
                  filterType.includes('length') 
                    ? "Enter number..." 
                    : "Enter filter criteria..."
                }
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="mt-2"
                type={filterType.includes('length') ? 'number' : 'text'}
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Original Words</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{getWordCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Filtered Words</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{getWordCount(output)}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Filtered Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Filtered text will appear here..."
            />
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Example:</strong> Filter words containing "o" from "The quick brown fox" → "brown fox"
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

export default FilterWordsInText;
