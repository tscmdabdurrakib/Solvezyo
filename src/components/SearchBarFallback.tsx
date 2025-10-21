import { Skeleton } from "@/components/ui/skeleton";

export function SearchBarFallback() {
  return (
    <div className="relative">
      <Skeleton className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
      <Skeleton className="w-full pl-10 pr-4 py-3 rounded-full" />
    </div>
  );
}