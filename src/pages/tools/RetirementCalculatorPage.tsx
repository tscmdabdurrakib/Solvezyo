import { useEffect } from "react";
import { RetirementCalculator } from "@/tools/calculation-tools/retirement-calculator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, PiggyBank, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function RetirementCalculatorPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Retirement Calculator | Plan Your Retirement Savings - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Retirement Calculator</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <PiggyBank className="h-6 w-6 text-primary" />
            <span>Retirement Calculator</span>
          </h1>
          <p className="text-muted-foreground">
            Plan your retirement savings by calculating how much you'll have saved by retirement age based on your
            current savings, monthly contributions, and expected investment returns.
          </p>
        </div>

        {/* The Retirement Calculator Tool */}
        <RetirementCalculator />

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>The retirement calculator combines two components:</p>
              <div>
                <p className="font-semibold text-foreground mb-1">Future Value of Current Savings:</p>
                <p className="font-mono bg-muted p-2 rounded mb-2">FV = PV × (1 + r)^n</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Future Value of Monthly Contributions:</p>
                <p className="font-mono bg-muted p-2 rounded mb-2">FV = PMT × [((1 + r)^n - 1) / r]</p>
              </div>
              <p>Where r is the monthly return rate and n is the number of months until retirement.</p>
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
                  Calculate retirement savings projections
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Include current savings and monthly contributions
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Factor in expected investment returns
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  See total contributions vs. interest earned
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Plan for any retirement age
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Understand the power of compound growth
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
