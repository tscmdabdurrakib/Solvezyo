import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Copy, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function GenerateZalgoText() {
  const [inputText, setInputText] = useState<string>('Make spooky text!\nZ̴a̴l̴g̴o̴ ̴t̴e̴x̴t̴ ̴g̴e̴n̴e̴r̴a̴t̴o̴r̴\nCorrupted and glitchy');
  const [intensity, setIntensity] = useState<number[]>([3]);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const zalgoMarks = {
    up: [
      '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
      '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0313', '\u0314', '\u033d', '\u0309', '\u0312',
      '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
      '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362'
    ],
    middle: [
      '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u034f', '\u0353', '\u0354', '\u0355', '\u0356',
      '\u035a', '\u035b', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337',
      '\u0336', '\u0335', '\u0334', '\u0336'
    ],
    down: [
      '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
      '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330',
      '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348',
      '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a'
    ]
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const zalgoText = inputText.replace(/./g, (char) => {
      if (char.match(/[a-zA-Z]/)) {
        let result = char;
        const currentIntensity = intensity[0];
        
        // Add random marks based on intensity
        for (let i = 0; i < Math.random() * currentIntensity; i++) {
          const markType = Math.random();
          let marks;
          
          if (markType < 0.33) {
            marks = zalgoMarks.up;
          } else if (markType < 0.66) {
            marks = zalgoMarks.middle;
          } else {
            marks = zalgoMarks.down;
          }
          
          const randomMark = marks[Math.floor(Math.random() * marks.length)];
          result += randomMark;
        }
        
        return result;
      }
      return char;
    });

    setOutput(zalgoText);
  }, [inputText, intensity]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Zalgo text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Generate Zalgo Text</CardTitle>
          </div>
          <CardDescription>Create spooky, corrupted text with Unicode combining characters</CardDescription>
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
            <Label htmlFor="intensity">Corruption Intensity: {intensity[0]}</Label>
            <Slider
              id="intensity"
              min={1}
              max={10}
              step={1}
              value={intensity}
              onValueChange={setIntensity}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Z̴a̴l̴g̴o̴ ̴T̴e̴x̴t̴:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Z̴a̴l̴g̴o̴ ̴t̴e̴x̴t̴ ̴w̴i̴l̴l̴ ̴a̴p̴p̴e̴a̴r̴ ̴h̴e̴r̴e̴..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>E̴x̴a̴m̴p̴l̴e̴:</strong> C̴o̴n̴v̴e̴r̴t̴ "Hello" t̴o̴ "H̴e̴l̴l̴o̴" - p̴e̴r̴f̴e̴c̴t̴ f̴o̴r̴ s̴p̴o̴o̴k̴y̴ e̴f̴f̴e̴c̴t̴s̴!
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

export default GenerateZalgoText;