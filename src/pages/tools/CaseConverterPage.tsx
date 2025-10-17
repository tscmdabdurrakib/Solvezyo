import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import CaseConverter from "@/tools/unit-conversion/case-converter/index";

export default function CaseConverterPage() {
  useEffect(() => {
    document.title = "Case Converter | Convert Text to UPPER, lower, camelCase and More";
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
            <Link href="/category/unit-conversion">
              <Badge variant="outline" className="text-xs font-medium">
                Unit & Conversion Tools
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Case Converter</h1>
          <p className="text-lg text-muted-foreground">Convert text between different case formats and styles</p>
        </div>

        <div className="grid gap-8 mb-10">
          <CaseConverter />
        </div>

        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Case Conversion?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Case conversion transforms text between different capitalization formats. Each format serves specific purposes in writing, programming, and design.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/numbers-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Numbers Converter
              </Button>
            </Link>
            <Link href="/tools/data-storage-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Data Storage Converter
              </Button>
            </Link>
            <Link href="/tools/currency-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Currency Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
