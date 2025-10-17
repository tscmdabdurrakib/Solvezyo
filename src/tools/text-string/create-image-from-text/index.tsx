import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Image, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CreateImageFromText() {
  const [inputText, setInputText] = useState<string>('Hello World!\nCreate beautiful text images\nwith custom fonts and colors');
  const [fontSize, setFontSize] = useState<number>(24);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [padding, setPadding] = useState<number>(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const fontOptions = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
    'Trebuchet MS', 'Arial Black', 'Impact'
  ];

  useEffect(() => {
    if (!inputText.trim()) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set font
    ctx.font = `${fontSize}px ${fontFamily}`;
    
    // Calculate canvas dimensions
    const lines = inputText.split('\n');
    const lineHeight = fontSize * 1.2;
    const maxWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
    
    const canvasWidth = maxWidth + (padding * 2);
    const canvasHeight = (lines.length * lineHeight) + (padding * 2);
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Reset font after canvas resize
    ctx.font = `${fontSize}px ${fontFamily}`;
    
    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw text
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'top';
    
    lines.forEach((line, index) => {
      const y = padding + (index * lineHeight);
      ctx.fillText(line, padding, y);
    });
  }, [inputText, fontSize, fontFamily, textColor, backgroundColor, padding]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const link = document.createElement('a');
      link.download = 'text-image.png';
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Text image has been downloaded successfully",
      });
    } catch (err) {
      toast({
        title: "Failed to download",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Image className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Create an Image from Text</CardTitle>
          </div>
          <CardDescription>Convert your text into a beautiful downloadable image</CardDescription>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="font-size">Font Size:</Label>
              <Input
                id="font-size"
                type="number"
                min="8"
                max="200"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="font-family">Font Family:</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="padding">Padding:</Label>
              <Input
                id="padding"
                type="number"
                min="0"
                max="100"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="text-color">Text Color:</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="mt-2 h-10"
              />
            </div>

            <div>
              <Label htmlFor="background-color">Background Color:</Label>
              <Input
                id="background-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="mt-2 h-10"
              />
            </div>
          </div>

          <div>
            <Label>Preview:</Label>
            <div className="mt-2 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 flex justify-center">
              <canvas 
                ref={canvasRef}
                className="max-w-full border border-gray-300 dark:border-gray-600"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Example:</strong> Create custom text images for social media, presentations, or design projects
            </p>
          </div>

          <Button
            onClick={downloadImage}
            data-testid="button-download"
            className="w-full"
            disabled={!inputText.trim()}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateImageFromText;