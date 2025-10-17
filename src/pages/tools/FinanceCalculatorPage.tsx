import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FinanceCalculator = lazy(() => import("@/tools/calculation-tools/finance-calculator"));

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/3 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function FinanceCalculatorPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <FinanceCalculator />
    </Suspense>
  );
}
