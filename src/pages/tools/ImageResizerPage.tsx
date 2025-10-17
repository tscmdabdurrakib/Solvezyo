import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import ImageResizer from "@/tools/image-media/image-resizer/index";

/**
 * ImageResizerPage Component
 * 
 * Renders the image resizer tool with proper page layout
 */
export default function ImageResizerPage() {
  // Set document title
  useEffect(() => {
    document.title = "Image Resizer | Resize Images Online - JPG, PNG, WEBP";
  }, []);
  
  return (
    <>
      <div className="container max-w-5xl py-6 md:py-10">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="p-0 mb-2 h-auto" asChild>
              <div className="flex items-center text-muted-foreground text-sm font-normal hover:text-primary">
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                <span>Back to home</span>
              </div>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2 mb-1">
            <Link href="/category/image-media">
              <Badge variant="outline" className="text-xs font-medium">
                Image & Media Tools
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Image Resizer</h1>
          <p className="text-lg text-muted-foreground">Resize images online with custom dimensions, aspect ratios, and quality settings</p>
        </div>

        <div className="grid gap-8 mb-10">
          <ImageResizer />
        </div>

        {/* What, How, Why sections */}
        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Image Resizing?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Image resizing changes the dimensions (width and height) of digital images while maintaining visual quality. It's essential for web optimization, social media, printing, and storage management.
              </p>
              <div>
                <h3 className="font-medium mb-1">Supported Formats</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• JPG/JPEG - Best for photos and complex images</p>
                  <p>• PNG - Perfect for logos and images with transparency</p>
                  <p>• WEBP - Modern format with excellent compression</p>
                  <p>• GIF - For simple animations and graphics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">How to Use This Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">Step 1</h3>
                  <p className="text-sm text-muted-foreground">Upload your image by clicking or dragging</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 2</h3>
                  <p className="text-sm text-muted-foreground">Set custom dimensions or choose preset ratios</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 3</h3>
                  <p className="text-sm text-muted-foreground">Adjust quality and select output format</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 4</h3>
                  <p className="text-sm text-muted-foreground">Preview and download your resized image</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Why Use Our Image Resizer?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">For Web Development</h3>
                  <p className="text-sm text-muted-foreground">Optimize images for faster website loading and better SEO</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Social Media</h3>
                  <p className="text-sm text-muted-foreground">Perfect dimensions for Instagram, Facebook, Twitter posts</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For E-commerce</h3>
                  <p className="text-sm text-muted-foreground">Consistent product image sizes for online stores</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Printing</h3>
                  <p className="text-sm text-muted-foreground">Prepare images with exact dimensions for print materials</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/image-compressor">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Image Compressor
              </Button>
            </Link>
            <Link href="/tools/image-format-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Format Converter
              </Button>
            </Link>
            <Link href="/tools/image-cropper">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Image Cropper
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
