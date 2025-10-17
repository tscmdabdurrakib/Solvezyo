import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AnonymizeText() {
  const [inputText, setInputText] = useState<string>('My name is John Smith and I live at 123 Main Street.\nYou can reach me at john.smith@email.com or call 555-1234.\nMy SSN is 123-45-6789.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;

    // Anonymize email addresses
    result = result.replace(/([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[EMAIL REDACTED]');

    // Anonymize phone numbers (various formats)
    result = result.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[PHONE REDACTED]');

    // Anonymize SSN/National ID (123-45-6789 format)
    result = result.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN REDACTED]');

    // Anonymize credit card numbers (16 digits with optional spaces/dashes)
    result = result.replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD REDACTED]');

    // Anonymize IP addresses
    result = result.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[IP REDACTED]');

    // Anonymize common name patterns (capitalized words that might be names)
    // This is a simple heuristic - may need refinement
    result = result.replace(/\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g, '[NAME REDACTED]');

    // Anonymize street addresses (number + street name pattern)
    result = result.replace(/\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct)\b/gi, '[ADDRESS REDACTED]');

    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Anonymized text copied to clipboard",
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
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Anonymize Text</CardTitle>
          </div>
          <CardDescription>Automatically redact personal information from your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Anonymized Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Anonymized text will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Protected data:</strong> Emails, phone numbers, SSN, credit cards, IP addresses, names, and street addresses are automatically redacted.
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

export default AnonymizeText;
