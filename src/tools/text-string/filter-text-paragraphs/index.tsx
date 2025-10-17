import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FilterTextParagraphs() {
  const [inputText, setInputText] = useState<string>('This is the first paragraph.\n\nThis contains the word "important" in the middle.\n\nThis is the third paragraph.\n\nAnother paragraph with important information.\n\nLast paragraph without any special content.');
  const [filterKeyword, setFilterKeyword] = useState<string>('important');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const paragraphs = inputText.split(/\n\s*\n/);
    const filteredParagraphs = paragraphs.filter(paragraph => {
      if (!filterKeyword) return true;
      
      const searchText = caseSensitive ? paragraph : paragraph.toLowerCase();
      const searchKeyword = caseSensitive ? filterKeyword : filterKeyword.toLowerCase();
      
      return searchText.includes(searchKeyword);
    });
    
    setOutput(filteredParagraphs.join('\n\n'));
  }, [inputText, filterKeyword, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Filtered paragraphs copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Filter Text Paragraphs</CardTitle>
          </div>
          <CardDescription>Filter paragraphs based on keywords and conditions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with paragraphs to filter..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="filter-keyword">Filter Keyword:</Label>
              <Input
                id="filter-keyword"
                data-testid="input-filter-keyword"
                placeholder="Enter keyword to filter by..."
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
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
          </div>

          <div>
            <Label htmlFor="output">Filtered Paragraphs:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Filtered paragraphs will appear here..."
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

export default FilterTextParagraphs;