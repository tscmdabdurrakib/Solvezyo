import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Base64Encode from "@/tools/text-string/base64-encode/index";

export default function Base64EncodePage() {
  useEffect(() => {
    document.title = "Base64 Encode | Convert Text to Base64 Format - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Base64 Encode</h1>
          <p className="text-lg text-muted-foreground">Convert text to Base64 encoded format</p>
        </div>

        <div className="flex justify-center mb-10">
          <Base64Encode />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Base64 Encoding?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Base64 is a binary-to-text encoding scheme that converts binary data into ASCII text format. It uses 64 different characters (A-Z, a-z, 0-9, +, /) to represent data, making it safe to transmit over channels that only support text.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">When to Use Base64 Encoding:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Embedding images in HTML/CSS (data URIs)</li>
                  <li>Encoding email attachments (MIME)</li>
                  <li>Storing binary data in JSON or XML</li>
                  <li>Transmitting data in APIs and web services</li>
                  <li>Creating authentication tokens</li>
                  <li>Encoding passwords for basic auth headers</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">How It Works:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Converts every 3 bytes (24 bits) into 4 Base64 characters (32 bits)</li>
                  <li>Uses padding with = character when input length isn't divisible by 3</li>
                  <li>Result is approximately 33% larger than original data</li>
                  <li>Output only contains printable ASCII characters</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/url-encode" data-testid="link-related-url-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Encode
              </Button>
            </Link>
            <Link href="/tools/html-encode" data-testid="link-related-html-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                HTML Encode
              </Button>
            </Link>
            <Link href="/tools/case-converter" data-testid="link-related-case-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Case Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
