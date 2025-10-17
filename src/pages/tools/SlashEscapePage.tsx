import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import SlashEscape from "@/tools/text-string/slash-escape/index";

export default function SlashEscapePage() {
  useEffect(() => {
    document.title = "Slash Escape | Add Escape Characters to Text - Solvezyo";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Slash Escape</h1>
          <p className="text-lg text-muted-foreground">Add escape slashes to special characters in text</p>
        </div>

        <div className="flex justify-center mb-10">
          <SlashEscape />
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Slash Escaping?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Slash escaping (also called backslash escaping) is a technique used to represent special characters in strings. By adding a backslash (\) before certain characters, we can include them in strings without breaking the syntax. This is essential in programming, JSON, and many data formats.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Common Escape Sequences:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>\n - Newline (line break)</li>
                  <li>\t - Tab character</li>
                  <li>\r - Carriage return</li>
                  <li>\" - Double quote</li>
                  <li>\' - Single quote</li>
                  <li>\\ - Backslash itself</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Use Cases:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Preparing text for JSON strings</li>
                  <li>Escaping code for string literals</li>
                  <li>Processing text for programming languages</li>
                  <li>Protecting special characters in data files</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/slash-unescape" data-testid="link-related-slash-unescape">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Slash Unescape
              </Button>
            </Link>
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
          </div>
        </div>
      </div>
    </>
  );
}
