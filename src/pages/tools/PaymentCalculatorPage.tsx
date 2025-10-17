import { useEffect } from "react";
import { PaymentCalculator } from "@/tools/calculation-tools/payment-calculator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, CreditCard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function PaymentCalculatorPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Payment Calculator | Calculate Payment Schedules - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Payment Calculator</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <CreditCard className="h-6 w-6 text-primary" />
            <span>Payment Calculator</span>
          </h1>
          <p className="text-muted-foreground">
            Calculate payment amounts for different schedules including weekly, bi-weekly, monthly, quarterly, and annual payments.
            Perfect for loan repayment planning and debt management.
          </p>
        </div>

        {/* The Payment Calculator Tool */}
        <PaymentCalculator />

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Frequencies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Different payment frequencies can affect your total interest paid:</p>
              <div className="space-y-2">
                <p><span className="font-semibold">Weekly:</span> 52 payments per year</p>
                <p><span className="font-semibold">Bi-weekly:</span> 26 payments per year</p>
                <p><span className="font-semibold">Monthly:</span> 12 payments per year</p>
                <p><span className="font-semibold">Quarterly:</span> 4 payments per year</p>
                <p><span className="font-semibold">Annually:</span> 1 payment per year</p>
              </div>
              <p>More frequent payments can reduce total interest paid over the loan term.</p>
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
                  Calculate payments for multiple frequencies
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Compare weekly, bi-weekly, monthly payments
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  See total interest for different schedules
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Perfect for debt consolidation planning
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Flexible payment frequency options
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Accurate calculations for any loan type
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
