import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Base64Decode from "@/tools/text-string/base64-decode/index";

export default function Base64DecodePage() {
  useEffect(() => {
    document.title = "Base64 Decode | Convert Base64 to Text - Solvezyo";
  }, []);
  
  return (
    <>
      <div className="container max-w-5xl mx-auto py-6 md:py-10">
        <div className="mb-8 text-center">
          <Link href="/" data-testid="link-back-home">
            <Button variant="ghost" className="p-0 mb-2 h-auto mx-auto" asChild>
              <div className="flex items-center text-muted-foreground text-sm font-normal hover:text-primary">
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                <span>Back to home</span>
              </div>
            </Button>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Link href="/category/text-string" data-testid="link-category">
              <Badge variant="outline" className="text-xs font-medium">
                Text & String Tools
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Base64 Decode</h1>
          <p className="text-lg text-muted-foreground">Convert Base64 encoded text back to readable format</p>
        </div>

        <div className="flex justify-center mb-10">
          <Base64Decode />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Base64 Decoding?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Base64 decoding is the reverse process of Base64 encoding. It converts Base64 encoded ASCII text back into its original binary or text format. This is essential when you need to read or process data that has been encoded for transmission or storage.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Common Use Cases:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Decoding email attachments and MIME content</li>
                  <li>Reading Base64 encoded images in data URIs</li>
                  <li>Processing encoded API responses</li>
                  <li>Extracting data from JWT tokens</li>
                  <li>Converting Base64 strings back to original text</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">How It Works:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Takes Base64 encoded string as input</li>
                  <li>Converts 4 Base64 characters back to 3 bytes</li>
                  <li>Handles padding (=) characters automatically</li>
                  <li>Returns the original decoded text or data</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/base64-encode" data-testid="link-related-base64-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Base64 Encode
              </Button>
            </Link>
            <Link href="/tools/url-decode" data-testid="link-related-url-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Decode
              </Button>
            </Link>
            <Link href="/tools/html-decode" data-testid="link-related-html-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                HTML Decode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
