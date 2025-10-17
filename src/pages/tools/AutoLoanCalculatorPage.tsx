import { useEffect } from "react";
import { AutoLoanCalculator } from "@/tools/calculation-tools/auto-loan-calculator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Car, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function AutoLoanCalculatorPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Auto Loan Calculator | Calculate Car Payments - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Auto Loan Calculator</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Car className="h-6 w-6 text-primary" />
            <span>Auto Loan Calculator</span>
          </h1>
          <p className="text-muted-foreground">
            Calculate your car loan payments including down payment considerations. Get accurate monthly payments,
            total interest, and loan details for your vehicle financing.
          </p>
        </div>

        {/* The Auto Loan Calculator Tool */}
        <AutoLoanCalculator />

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>The auto loan calculator first calculates your loan amount by subtracting your down payment from the car price:</p>
              <p className="font-mono bg-muted p-2 rounded">
                Loan Amount = Car Price - Down Payment
              </p>
              <p>Then it uses the standard loan payment formula to calculate monthly payments on the financed amount.</p>
              <p>A larger down payment reduces your loan amount and monthly payments, saving you money on interest over time.</p>
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
                  Calculate auto loan payments with down payment
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  See actual loan amount after down payment
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  View total cost including down payment
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Calculate total interest on financed amount
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Perfect for car, truck, or motorcycle financing
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Handles cases with full cash payment
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
