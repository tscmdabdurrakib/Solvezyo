import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import CurrencyConverter from "@/tools/unit-conversion/currency-converter/index";

/**
 * CurrencyConverterPage Component
 * 
 * Renders the currency converter tool with proper page layout
 */
export default function CurrencyConverterPage() {
  // Set document title
  useEffect(() => {
    document.title = "Currency Converter | Live Exchange Rates for USD, EUR, BDT and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Currency Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between world currencies using real-time exchange rates</p>
        </div>

        <div className="grid gap-8 mb-10">
          <CurrencyConverter />
        </div>

        {/* What, How, Why sections */}
        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Currency Conversion?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Currency conversion is the process of exchanging one currency for another at the current market exchange rate. Exchange rates fluctuate constantly based on economic factors, trade relationships, and market demand.
              </p>
              <div>
                <h3 className="font-medium mb-1">Popular Currencies</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• USD - United States Dollar (World's primary reserve currency)</p>
                  <p>• EUR - Euro (European Union's official currency)</p>
                  <p>• GBP - British Pound Sterling</p>
                  <p>• JPY - Japanese Yen</p>
                  <p>• BDT - Bangladeshi Taka</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">How to Use This Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">Step 1</h3>
                  <p className="text-sm text-muted-foreground">Enter the amount you want to convert</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 2</h3>
                  <p className="text-sm text-muted-foreground">Select the source currency from the dropdown</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 3</h3>
                  <p className="text-sm text-muted-foreground">Choose your target currency</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 4</h3>
                  <p className="text-sm text-muted-foreground">Get real-time conversion results instantly</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Why Use Our Currency Converter?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">For Travelers</h3>
                  <p className="text-sm text-muted-foreground">Plan your budget and understand local currency values</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Business</h3>
                  <p className="text-sm text-muted-foreground">Calculate international transaction costs and pricing</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Investment</h3>
                  <p className="text-sm text-muted-foreground">Track foreign exchange rates for investment decisions</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Education</h3>
                  <p className="text-sm text-muted-foreground">Learn about global economics and currency relationships</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
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
            <Link href="/tools/volume-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Volume Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
