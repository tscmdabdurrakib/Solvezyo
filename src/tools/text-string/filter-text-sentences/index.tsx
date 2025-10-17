import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FilterTextSentences() {
  const [inputText, setInputText] = useState<string>('This is the first sentence. Here is another one! And this is a question? Finally, this is the last sentence.');
  const [filterType, setFilterType] = useState<string>('contains');
  const [filterValue, setFilterValue] = useState<string>('is');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into sentences (split by periods, exclamation marks, and question marks)
    const sentences = inputText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    
    if (!filterValue.trim()) {
      setOutput(inputText);
      return;
    }
    
    let filteredSentences: string[] = [];
    
    for (const sentence of sentences) {
      const sentenceToCheck = caseSensitive ? sentence : sentence.toLowerCase();
      const valueToCheck = caseSensitive ? filterValue : filterValue.toLowerCase();
      
      let matches = false;
      
      switch (filterType) {
        case 'contains':
          matches = sentenceToCheck.includes(valueToCheck);
          break;
        case 'not-contains':
          matches = !sentenceToCheck.includes(valueToCheck);
          break;
        case 'starts-with':
          matches = sentenceToCheck.trimStart().startsWith(valueToCheck);
          break;
        case 'ends-with':
          matches = sentenceToCheck.trimEnd().endsWith(valueToCheck);
          break;
        case 'word-count-greater':
          const minWords = parseInt(filterValue) || 0;
          const wordCount = sentence.trim().split(/\s+/).length;
          matches = wordCount > minWords;
          break;
        case 'word-count-less':
          const maxWords = parseInt(filterValue) || 0;
          const wordCountLess = sentence.trim().split(/\s+/).length;
          matches = wordCountLess < maxWords;
          break;
        case 'length-greater':
          const minLength = parseInt(filterValue) || 0;
          matches = sentence.trim().length > minLength;
          break;
        case 'length-less':
          const maxLength = parseInt(filterValue) || 0;
          matches = sentence.trim().length < maxLength;
          break;
        case 'regex':
          try {
            const regex = new RegExp(filterValue, caseSensitive ? 'g' : 'gi');
            matches = regex.test(sentence);
          } catch (e) {
            // Invalid regex, no matches
            matches = false;
          }
          break;
        default:
          matches = true;
      }
      
      if (matches) {
        filteredSentences.push(sentence);
      }
    }
    
    setOutput(filteredSentences.join(' '));
  }, [inputText, filterType, filterValue, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Filtered sentences copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getSentenceCount = (text: string) => {
    if (!text.trim()) return 0;
    return text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0).length;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Filter Text Sentences</CardTitle>
          </div>
          <CardDescription>Filter sentences from your text based on various criteria</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to filter sentences from..."
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
                  <SelectItem value="word-count-greater">Word count greater than</SelectItem>
                  <SelectItem value="word-count-less">Word count less than</SelectItem>
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
                  filterType.includes('count') || filterType.includes('length')
                    ? "Enter number..." 
                    : "Enter filter criteria..."
                }
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="mt-2"
                type={filterType.includes('count') || filterType.includes('length') ? 'number' : 'text'}
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Original Sentences</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{getSentenceCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Filtered Sentences</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{getSentenceCount(output)}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Filtered Sentences:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Filtered sentences will appear here..."
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Example:</strong> Filter sentences containing "is" from text → Only sentences with "is" will remain
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

export default FilterTextSentences;
