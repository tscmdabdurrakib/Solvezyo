import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import UrlDecode from "@/tools/text-string/url-decode/index";

export default function UrlDecodePage() {
  useEffect(() => {
    document.title = "URL Decode | Convert URL-Encoded Text Back to Readable Format - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">URL Decode</h1>
          <p className="text-lg text-muted-foreground">Convert URL-encoded text back to readable format</p>
        </div>

        <div className="flex justify-center mb-10">
          <UrlDecode />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is URL Decoding?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                URL decoding is the reverse process of URL encoding. It converts percent-encoded characters back to their original form, making URLs and encoded text readable again. This is essential when working with web applications and APIs.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">When to Use URL Decoding:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Reading query parameters from URLs</li>
                  <li>Debugging API requests and responses</li>
                  <li>Converting encoded links to readable text</li>
                  <li>Processing form data submissions</li>
                  <li>Analyzing web traffic and logs</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Common Decodings:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>%20 → Space</li>
                  <li>%21 → !</li>
                  <li>%40 → @</li>
                  <li>%23 → #</li>
                  <li>%2B → +</li>
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
            <Link href="/tools/html-decode" data-testid="link-related-html-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                HTML Decode
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
