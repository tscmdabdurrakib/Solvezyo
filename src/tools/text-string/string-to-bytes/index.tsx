import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Binary } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function StringToBytes() {
  const [inputText, setInputText] = useState<string>('Hello World! 🌍 Welcome to ToolNexas - Professional Tools & Solutions 🚀');
  const [encoding, setEncoding] = useState<string>('utf8');
  const [output, setOutput] = useState<string>('');
  const [byteCount, setByteCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setByteCount(0);
      return;
    }
    
    try {
      let bytes: number[] = [];
      
      switch (encoding) {
        case 'utf8':
          // UTF-8 encoding
          const utf8Bytes = new TextEncoder().encode(inputText);
          bytes = Array.from(utf8Bytes);
          break;
        case 'ascii':
          // ASCII encoding (only works for ASCII characters)
          bytes = [];
          for (let i = 0; i < inputText.length; i++) {
            const charCode = inputText.charCodeAt(i);
            if (charCode <= 127) {
              bytes.push(charCode);
            } else {
              bytes.push(63); // '?' for non-ASCII characters
            }
          }
          break;
        case 'hex':
          // Hexadecimal representation
          const hexBytes = new TextEncoder().encode(inputText);
          bytes = Array.from(hexBytes);
          setOutput(Array.from(hexBytes).map(b => b.toString(16).padStart(2, '0')).join(' '));
          setByteCount(hexBytes.length);
          return;
        case 'binary':
          // Binary representation
          const binBytes = new TextEncoder().encode(inputText);
          bytes = Array.from(binBytes);
          setOutput(Array.from(binBytes).map(b => b.toString(2).padStart(8, '0')).join(' '));
          setByteCount(binBytes.length);
          return;
        default:
          bytes = Array.from(new TextEncoder().encode(inputText));
      }
      
      setOutput(bytes.join(' '));
      setByteCount(bytes.length);
    } catch (error) {
      setOutput('Error converting text to bytes');
      setByteCount(0);
    }
  }, [inputText, encoding]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Byte representation copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Binary className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Convert a String to Bytes</CardTitle>
          </div>
          <CardDescription>Convert text to byte representation in various encoding formats</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="encoding">Encoding Format:</Label>
            <Select value={encoding} onValueChange={setEncoding}>
              <SelectTrigger id="encoding" data-testid="select-encoding" className="mt-2">
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
              {encoding === 'utf8' && 'Convert to UTF-8 byte values (decimal)'}
              {encoding === 'ascii' && 'Convert to ASCII byte values (decimal, non-ASCII becomes ?)'}
              {encoding === 'hex' && 'Convert to hexadecimal representation'}
              {encoding === 'binary' && 'Convert to binary representation'}
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to convert to bytes..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter any text including Unicode characters and emojis
            </p>
          </div>

          <div className="text-center">
            <Card className="p-4 inline-block">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{byteCount}</div>
              <div className="text-sm text-muted-foreground">Total Bytes</div>
            </Card>
          </div>

          <div>
            <Label htmlFor="output">Byte Representation:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Byte representation will appear here..."
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Byte Representation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StringToBytes;
