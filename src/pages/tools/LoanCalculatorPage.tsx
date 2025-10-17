import { useEffect } from "react";
import { LoanCalculator } from "@/tools/calculation-tools/loan-calculator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, DollarSign, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function LoanCalculatorPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Loan Calculator | Calculate Monthly Payments - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Loan Calculator</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <DollarSign className="h-6 w-6 text-primary" />
            <span>Loan Calculator</span>
          </h1>
          <p className="text-muted-foreground">
            Calculate your monthly loan payments, total interest, and payment schedule with our comprehensive loan calculator.
            Perfect for mortgages, personal loans, and business loans.
          </p>
        </div>

        {/* The Loan Calculator Tool */}
        <LoanCalculator />

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Our loan calculator uses the standard loan payment formula to calculate your monthly payments:</p>
              <p className="font-mono bg-muted p-2 rounded">
                Payment = P × [r(1+r)^n] / [(1+r)^n - 1]
              </p>
              <p>Where P is the principal amount, r is the monthly interest rate, and n is the number of payments.</p>
              <p>The calculator also shows your total interest paid over the life of the loan, helping you understand the true cost of borrowing.</p>
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
                  Calculate monthly loan payments instantly
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  View total interest over loan term
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  See total amount paid over loan life
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Works for any loan type (mortgage, personal, business)
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Handles zero-interest loans automatically
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Professional results with breakdown
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
