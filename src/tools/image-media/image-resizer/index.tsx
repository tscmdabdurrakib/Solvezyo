import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Image, Upload, Download, RotateCcw, Link2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ImageData {
  file: File;
  url: string;
  width: number;
  height: number;
}

interface ResizeSettings {
  width: number;
  height: number;
  lockAspectRatio: boolean;
  quality: number;
  format: string;
  aspectRatio: string;
}

function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<ResizeSettings>({
    width: 800,
    height: 600,
    lockAspectRatio: true,
    quality: 90,
    format: 'jpeg',
    aspectRatio: 'custom'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Aspect ratio presets
  const aspectRatios = {
    'custom': { label: 'Custom', ratio: null },
    '1:1': { label: 'Square (1:1)', ratio: 1 },
    '4:3': { label: 'Standard (4:3)', ratio: 4/3 },
    '16:9': { label: 'Widescreen (16:9)', ratio: 16/9 },
    '3:2': { label: 'Photo (3:2)', ratio: 3/2 },
    '9:16': { label: 'Portrait (9:16)', ratio: 9/16 }
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WEBP, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    const url = URL.createObjectURL(file);
    
    const img = document.createElement('img');
    img.onload = () => {
      setOriginalImage({
        file,
        url,
        width: img.width,
        height: img.height
      });
      
      // Set initial dimensions
      setSettings(prev => ({
        ...prev,
        width: img.width,
        height: img.height
      }));
    };
    img.src = url;
  }, []);

  /**
   * Handle drag and drop
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  /**
   * Handle dimension changes
   */
  const updateDimensions = (width: number, height: number) => {
    if (!originalImage) return;

    if (settings.lockAspectRatio && settings.aspectRatio === 'custom') {
      const aspectRatio = originalImage.width / originalImage.height;
      if (width !== settings.width) {
        height = Math.round(width / aspectRatio);
      } else if (height !== settings.height) {
        width = Math.round(height * aspectRatio);
      }
    }

    setSettings(prev => ({ ...prev, width, height }));
  };

  /**
   * Handle aspect ratio change
   */
  const handleAspectRatioChange = (ratio: string) => {
    if (!originalImage) return;

    setSettings(prev => ({ ...prev, aspectRatio: ratio }));
    
    if (ratio !== 'custom') {
      const aspectRatioValue = aspectRatios[ratio as keyof typeof aspectRatios].ratio;
      if (aspectRatioValue) {
        const newHeight = Math.round(settings.width / aspectRatioValue);
        setSettings(prev => ({ ...prev, height: newHeight, lockAspectRatio: true }));
      }
    }
  };

  /**
   * Process image resize
   */
  const processImage = useCallback(async () => {
    if (!originalImage || !canvasRef.current) return;

    setIsProcessing(true);
    setError(null);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      canvas.width = settings.width;
      canvas.height = settings.height;

      const img = document.createElement('img');
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw resized image
        ctx.drawImage(img, 0, 0, settings.width, settings.height);
        
        // Convert to blob and create URL
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setResizedImageUrl(url);
          }
          setIsProcessing(false);
        }, `image/${settings.format}`, settings.quality / 100);
      };
      img.src = originalImage.url;
    } catch (err) {
      setError('Failed to process image. Please try again.');
      setIsProcessing(false);
    }
  }, [originalImage, settings]);

  /**
   * Download resized image
   */
  const downloadImage = () => {
    if (!resizedImageUrl || !originalImage) return;

    const link = document.createElement('a');
    link.href = resizedImageUrl;
    const originalName = originalImage.file.name.split('.')[0];
    link.download = `${originalName}_resized_${settings.width}x${settings.height}.${settings.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "Your resized image has been downloaded successfully",
    });
  };

  /**
   * Reset everything
   */
  const resetTool = () => {
    setOriginalImage(null);
    setResizedImageUrl(null);
    setSettings({
      width: 800,
      height: 600,
      lockAspectRatio: true,
      quality: 90,
      format: 'jpeg',
      aspectRatio: 'custom'
    });
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Upload Section */}
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex items-center gap-3">
            <Image className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">Image Resizer</CardTitle>
              <CardDescription>
                Upload and resize images with custom dimensions and quality settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {!originalImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop an image here, or click to select
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Select Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supports JPG, PNG, WEBP, GIF • Max 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Original Image Preview */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Original Image</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/50">
                    <img
                      src={originalImage.url}
                      alt="Original"
                      loading="lazy"
                      className="w-full h-48 object-contain"
                    />
                    <div className="p-3 text-xs text-muted-foreground">
                      {originalImage.width} × {originalImage.height} px
                    </div>
                  </div>
                </div>

                {/* Resized Image Preview */}
                <div>
                  <h3 className="font-medium mb-3">Preview</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/50 min-h-[12rem]">
                    {resizedImageUrl ? (
                      <>
                        <img
                          src={resizedImageUrl}
                          alt="Resized"
                          loading="lazy"
                          className="w-full h-48 object-contain"
                        />
                        <div className="p-3 text-xs text-muted-foreground">
                          {settings.width} × {settings.height} px
                        </div>
                      </>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-muted-foreground">
                        Click "Resize Image" to see preview
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Resize Settings */}
              <div className="space-y-6">
                <h3 className="font-medium">Resize Settings</h3>
                
                {/* Aspect Ratio Preset */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                    <Select 
                      value={settings.aspectRatio} 
                      onValueChange={handleAspectRatioChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(aspectRatios).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Switch 
                      checked={settings.lockAspectRatio}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, lockAspectRatio: checked }))}
                    />
                    <div className="flex items-center gap-1">
                      <Link2 className="h-4 w-4" />
                      <span className="text-sm">Lock Aspect Ratio</span>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Width (px)</label>
                    <Input
                      type="number"
                      value={settings.width}
                      onChange={(e) => updateDimensions(parseInt(e.target.value) || 0, settings.height)}
                      min={1}
                      max={4000}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Height (px)</label>
                    <Input
                      type="number"
                      value={settings.height}
                      onChange={(e) => updateDimensions(settings.width, parseInt(e.target.value) || 0)}
                      min={1}
                      max={4000}
                    />
                  </div>
                </div>

                {/* Output Settings */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Format</label>
                    <Select 
                      value={settings.format} 
                      onValueChange={(value) => setSettings(prev => ({ ...prev, format: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WEBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Quality: {settings.quality}%</label>
                    <Slider
                      value={[settings.quality]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, quality: value[0] }))}
                      min={1}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button 
                    onClick={processImage} 
                    disabled={isProcessing}
                    className="gap-2"
                  >
                    {isProcessing ? 'Processing...' : 'Resize Image'}
                  </Button>
                  
                  {resizedImageUrl && (
                    <Button 
                      onClick={downloadImage}
                      variant="outline"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  )}
                  
                  <Button 
                    onClick={resetTool}
                    variant="outline"
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="border-t bg-muted/10 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            All processing happens in your browser - your images never leave your device
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ImageResizer;
