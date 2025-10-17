import { useEffect } from "react";
import { InterestCalculator } from "@/tools/calculation-tools/interest-calculator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function InterestCalculatorPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Interest Calculator | Simple & Compound Interest - Solvezyo";
  }, [location]);

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/calculation-tools">Calculation Tools</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium">Interest Calculator</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>Interest Calculator</span>
          </h1>
          <p className="text-muted-foreground">
            Calculate simple or compound interest on your investments and savings. Compare different compounding
            frequencies to see how your money can grow over time.
          </p>
        </div>

        {/* The Interest Calculator Tool */}
        <InterestCalculator />

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Interest Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">Simple Interest:</p>
                <p className="font-mono bg-muted p-2 rounded mb-2">Interest = P × r × t</p>
                <p>Interest is calculated only on the principal amount.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Compound Interest:</p>
                <p className="font-mono bg-muted p-2 rounded mb-2">Amount = P × (1 + r/n)^(n×t)</p>
                <p>Interest is calculated on the principal plus previously earned interest.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-primary" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Calculate simple interest for loans and investments
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Calculate compound interest with various frequencies
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Compare different compounding periods
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Annual, semi-annual, quarterly, monthly, and daily compounding
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  View total return on investment
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Perfect for savings accounts and investments
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}