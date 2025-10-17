import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import HtmlDecode from "@/tools/text-string/html-decode/index";

export default function HtmlDecodePage() {
  useEffect(() => {
    document.title = "HTML Decode | Convert HTML Entities Back to Text - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">HTML Decode</h1>
          <p className="text-lg text-muted-foreground">Convert HTML entities back to readable text</p>
        </div>

        <div className="flex justify-center mb-10">
          <HtmlDecode />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is HTML Decoding?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                HTML decoding (HTML unescaping) converts HTML entities back to their original characters. This is useful when you need to read encoded HTML content or extract plain text from HTML-encoded strings.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">When to Use HTML Decoding:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Reading data from databases that store encoded HTML</li>
                  <li>Parsing RSS feeds and XML data</li>
                  <li>Converting encoded email content</li>
                  <li>Processing API responses with escaped HTML</li>
                  <li>Debugging web scraping results</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Common Decodings:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>&amp;lt; → &lt;</li>
                  <li>&amp;gt; → &gt;</li>
                  <li>&amp;amp; → &amp;</li>
                  <li>&amp;quot; → &quot;</li>
                  <li>&amp;nbsp; → (non-breaking space)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/html-encode" data-testid="link-related-html-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                HTML Encode
              </Button>
            </Link>
            <Link href="/tools/url-decode" data-testid="link-related-url-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Decode
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
