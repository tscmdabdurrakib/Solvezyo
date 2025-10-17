import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import NetstringToString from "@/tools/text-string/netstring-to-string/index";

export default function NetstringToStringPage() {
  useEffect(() => {
    document.title = "Netstring to String | Decode Netstring Format - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Netstring to String</h1>
          <p className="text-lg text-muted-foreground">Convert netstring format back to plain text</p>
        </div>

        <div className="flex justify-center mb-10">
          <NetstringToString />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">How Netstring Decoding Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Netstring decoding extracts the original string from its encoded netstring format. The decoder parses the length prefix, reads exactly that many bytes, and validates the format by checking for the trailing comma. This ensures reliable data extraction without ambiguity.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Decoding Process:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Parse the byte length before the colon (:)</li>
                  <li>Read exactly that many bytes after the colon</li>
                  <li>Verify the trailing comma (,) for validation</li>
                  <li>Return the extracted string data</li>
                  <li>Report error if format is invalid</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Examples:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>"5:hello," → "hello"</li>
                  <li>"12:Hello World!," → "Hello World!"</li>
                  <li>"0:," → "" (empty string)</li>
                  <li>Invalid format returns error message</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/string-to-netstring" data-testid="link-related-string-to-netstring">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                String to Netstring
              </Button>
            </Link>
            <Link href="/tools/base64-decode" data-testid="link-related-base64-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Base64 Decode
              </Button>
            </Link>
            <Link href="/tools/url-decode" data-testid="link-related-url-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Decode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
