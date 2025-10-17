import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertStringToImage() {
  const [inputText, setInputText] = useState<string>('Hello World!\nConvert your text to image easily.');
  const [fontSize, setFontSize] = useState<number>(24);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, fontSize, fontFamily, textColor, bgColor]);

  const generateImage = () => {
    if (!canvasRef.current || !inputText) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lines = inputText.split('\n');
    const lineHeight = fontSize * 1.5;
    const padding = 20;

    // Calculate canvas size
    ctx.font = `${fontSize}px ${fontFamily}`;
    let maxWidth = 0;
    lines.forEach(line => {
      const width = ctx.measureText(line).width;
      if (width > maxWidth) maxWidth = width;
    });

    canvas.width = maxWidth + (padding * 2);
    canvas.height = (lines.length * lineHeight) + (padding * 2);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';

    lines.forEach((line, index) => {
      ctx.fillText(line, padding, padding + (index * lineHeight));
    });
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'text-image.png';
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Success!",
          description: "Image downloaded successfully",
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <ImageIcon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Convert String to Image</CardTitle>
          </div>
          <CardDescription>Convert your text into a downloadable image</CardDescription>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
              <Input
                id="font-size"
                data-testid="input-font-size"
                type="number"
                min="10"
                max="100"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value) || 24)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="font-family">Font Family:</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger id="font-family" data-testid="select-font-family" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="text-color">Text Color:</Label>
              <Input
                id="text-color"
                data-testid="input-text-color"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="mt-2 h-10"
              />
            </div>

            <div>
              <Label htmlFor="bg-color">Background Color:</Label>
              <Input
                id="bg-color"
                data-testid="input-bg-color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-2 h-10"
              />
            </div>
          </div>

          <div className="pt-4">
            <Label>Preview:</Label>
            <div className="mt-2 border-2 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 flex justify-center">
              <canvas
                ref={canvasRef}
                data-testid="canvas-preview"
                className="max-w-full border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <Button
            onClick={downloadImage}
            data-testid="button-download"
            className="w-full"
            disabled={!inputText}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConvertStringToImage;
