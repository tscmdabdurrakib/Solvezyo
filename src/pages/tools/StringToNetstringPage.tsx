import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import StringToNetstring from "@/tools/text-string/string-to-netstring/index";

export default function StringToNetstringPage() {
  useEffect(() => {
    document.title = "String to Netstring | Convert Text to Netstring Format - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">String to Netstring</h1>
          <p className="text-lg text-muted-foreground">Convert plain text to netstring format</p>
        </div>

        <div className="flex justify-center mb-10">
          <StringToNetstring />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Netstring Format?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Netstrings are a simple and efficient way to encode strings for network transmission or storage. Invented by Dan Bernstein, the format includes the string length, a colon, the string data, and a trailing comma. This self-delimiting format eliminates the need for escape sequences.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Format Structure:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Format: [byte_length]:[string_data],</li>
                  <li>Example: "hello" becomes "5:hello,"</li>
                  <li>Length is the number of bytes in the string</li>
                  <li>Colon separates length from data</li>
                  <li>Comma marks the end of the netstring</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Advantages:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>No escape sequences needed</li>
                  <li>Easy to parse and validate</li>
                  <li>Suitable for binary data transmission</li>
                  <li>Used in protocols like QMQP and QMTP</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/netstring-to-string" data-testid="link-related-netstring-to-string">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Netstring to String
              </Button>
            </Link>
            <Link href="/tools/base64-encode" data-testid="link-related-base64-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Base64 Encode
              </Button>
            </Link>
            <Link href="/tools/url-encode" data-testid="link-related-url-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Encode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
