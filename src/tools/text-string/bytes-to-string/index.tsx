import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function BytesToString() {
  const [inputText, setInputText] = useState<string>('72 101 108 108 111 32 87 111 114 108 100 33 32 240 159 140 141 32 87 101 108 99 111 109 101 32 116 111 32 84 111 111 108 78 101 120 97 115');
  const [inputFormat, setInputFormat] = useState<string>('utf8');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      let result = '';
      
      switch (inputFormat) {
        case 'utf8':
        case 'ascii':
          // Parse decimal byte values
          const decimalBytes = inputText.trim().split(/\s+/).map(b => parseInt(b, 10)).filter(b => !isNaN(b) && b >= 0 && b <= 255);
          if (decimalBytes.length > 0) {
            const uint8Array = new Uint8Array(decimalBytes);
            result = new TextDecoder('utf-8').decode(uint8Array);
          }
          break;
        case 'hex':
          // Parse hexadecimal values
          const hexValues = inputText.trim().replace(/[^0-9a-fA-F\s]/g, '').split(/\s+/).filter(h => h.length > 0);
          const hexBytes: number[] = [];
          hexValues.forEach(hex => {
            if (hex.length % 2 === 0) {
              for (let i = 0; i < hex.length; i += 2) {
                const byte = parseInt(hex.substr(i, 2), 16);
                if (!isNaN(byte)) {
                  hexBytes.push(byte);
                }
              }
            } else {
              const byte = parseInt(hex, 16);
              if (!isNaN(byte) && byte <= 255) {
                hexBytes.push(byte);
              }
            }
          });
          if (hexBytes.length > 0) {
            const uint8Array = new Uint8Array(hexBytes);
            result = new TextDecoder('utf-8').decode(uint8Array);
          }
          break;
        case 'binary':
          // Parse binary values
          const binaryValues = inputText.trim().split(/\s+/).filter(b => /^[01]+$/.test(b));
          const binaryBytes = binaryValues.map(b => parseInt(b, 2)).filter(b => !isNaN(b) && b >= 0 && b <= 255);
          if (binaryBytes.length > 0) {
            const uint8Array = new Uint8Array(binaryBytes);
            result = new TextDecoder('utf-8').decode(uint8Array);
          }
          break;
        default:
          result = 'Invalid input format';
      }
      
      setOutput(result);
    } catch (error) {
      setOutput('Error converting bytes to string');
    }
  }, [inputText, inputFormat]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Converted string copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="flex items-center justify-center gap-2">
            <Type className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Convert Bytes to a String</CardTitle>
          </div>
          <CardDescription>Convert byte representation back to readable text in various formats</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-format">Input Format:</Label>
            <Select value={inputFormat} onValueChange={setInputFormat}>
              <SelectTrigger id="input-format" data-testid="select-input-format" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utf8">UTF-8 (Decimal)</SelectItem>
                <SelectItem value="ascii">ASCII (Decimal)</SelectItem>
                <SelectItem value="hex">Hexadecimal</SelectItem>
                <SelectItem value="binary">Binary</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {inputFormat === 'utf8' && 'Convert from UTF-8 decimal byte values (space-separated)'}
              {inputFormat === 'ascii' && 'Convert from ASCII decimal byte values (space-separated)'}
              {inputFormat === 'hex' && 'Convert from hexadecimal values (space-separated or continuous)'}
              {inputFormat === 'binary' && 'Convert from binary values (space-separated)'}
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Bytes:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder={
                inputFormat === 'utf8' || inputFormat === 'ascii' 
                  ? "Enter decimal byte values separated by spaces (e.g., 72 101 108 108 111)"
                  : inputFormat === 'hex'
                  ? "Enter hex values separated by spaces (e.g., 48 65 6C 6C 6F) or continuous (48656C6C6F)"
                  : "Enter binary values separated by spaces (e.g., 01001000 01100101 01101100)"
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter byte values in the selected format
            </p>
          </div>

          <div>
            <Label htmlFor="output">Converted String:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Converted text will appear here..."
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Converted String
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default BytesToString;
