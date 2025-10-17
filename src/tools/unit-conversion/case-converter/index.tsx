import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Type, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CaseConverter() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  /**
   * Convert text to different cases
   */
  const convertToUpperCase = (text: string): string => text.toUpperCase();
  
  const convertToLowerCase = (text: string): string => text.toLowerCase();
  
  const convertToCapitalCase = (text: string): string => 
    text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  
  const convertToSentenceCase = (text: string): string => 
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  
  const convertToCamelCase = (text: string): string => 
    text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
  
  const convertToSnakeCase = (text: string): string => 
    text.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');

  /**
   * Copy text to clipboard
   */
  const copyToClipboard = (text: string, caseName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${caseName} text copied to clipboard`,
    });
  };

  /**
   * Reset converter
   */
  const resetConverter = () => {
    setInputText('');
  };

  const conversions = [
    { name: "UPPER CASE", value: convertToUpperCase(inputText), description: "ALL LETTERS IN CAPITALS" },
    { name: "lower case", value: convertToLowerCase(inputText), description: "all letters in lowercase" },
    { name: "Capitalized Case", value: convertToCapitalCase(inputText), description: "First Letter Of Each Word Capitalized" },
    { name: "Sentence case", value: convertToSentenceCase(inputText), description: "First letter of sentence capitalized" },
    { name: "camelCase", value: convertToCamelCase(inputText), description: "firstWordLowercaseFollowingWordsCapitalized" },
    { name: "snake_case", value: convertToSnakeCase(inputText), description: "words_separated_by_underscores" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Type className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Case Converter</CardTitle>
            <CardDescription>
              Convert text between different case formats and styles
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter your text
            </label>
            <Textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-24 w-full"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Enter any text to see it converted to different case formats
            </p>
          </div>

          {/* Conversion Results */}
          {inputText && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Converted Results</h3>
              <div className="grid gap-4">
                {conversions.map((conversion, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{conversion.name}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(conversion.value, conversion.name)}
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-background p-3 rounded border font-mono text-sm break-all">
                      {conversion.value || <span className="text-muted-foreground italic">No text to convert</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{conversion.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage Guide */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Case Format Guide:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>UPPER CASE:</span>
                <span>Perfect for titles and emphasis</span>
              </div>
              <div className="flex items-center justify-between">
                <span>camelCase:</span>
                <span>Common in programming variables</span>
              </div>
              <div className="flex items-center justify-between">
                <span>snake_case:</span>
                <span>Popular in Python and databases</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Capitalized Case:</span>
                <span>Great for headings and titles</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Instant text case conversion for all formats
        </div>
      </CardFooter>
    </Card>
  );
}

export default CaseConverter;
