import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import UrlEncode from "@/tools/text-string/url-encode/index";

export default function UrlEncodePage() {
  useEffect(() => {
    document.title = "URL Encode | Convert Text to URL-Safe Format - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">URL Encode</h1>
          <p className="text-lg text-muted-foreground">Convert text to URL-safe encoded format for use in web addresses</p>
        </div>

        <div className="flex justify-center mb-10">
          <UrlEncode />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is URL Encoding?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                URL encoding, also known as percent-encoding, is a method to encode special characters in URLs. Since URLs can only contain a limited set of characters from the ASCII character set, URL encoding converts unsafe characters into a format that can be transmitted over the Internet.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">When to Use URL Encoding:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Passing data in URL query parameters</li>
                  <li>Encoding special characters like spaces, &, ?, =, etc.</li>
                  <li>Creating shareable links with dynamic content</li>
                  <li>Building API requests with encoded parameters</li>
                  <li>Ensuring data integrity in web forms</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Common Encodings:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Space → %20 (or + in form data)</li>
                  <li>! → %21</li>
                  <li>@ → %40</li>
                  <li># → %23</li>
                  <li>$ → %24</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/url-decode" data-testid="link-related-url-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Decode
              </Button>
            </Link>
            <Link href="/tools/html-encode" data-testid="link-related-html-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                HTML Encode
              </Button>
            </Link>
            <Link href="/tools/base64-encode" data-testid="link-related-base64-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Base64 Encode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
