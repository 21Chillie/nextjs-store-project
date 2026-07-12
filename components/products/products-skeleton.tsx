import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsSkeletonCard() {
  return (
    <article className="h-full">
      <Card className="bg-card mx-auto w-full max-w-sm border pt-0">
        <div className="relative aspect-square w-full overflow-hidden">
          <Skeleton className="h-full w-full rounded-b-none" />
        </div>

        <CardHeader className="space-y-3 p-6">
          <Skeleton className="h-5 w-2/3 rounded" />

          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>

          <div className="pt-2">
            <Skeleton className="h-7 w-24 rounded" />
          </div>
        </CardHeader>
      </Card>
    </article>
  );
}

export function ProductsSkeletonGrid({
  amountSkeleton,
}: {
  amountSkeleton: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: amountSkeleton }).map((_, index) => {
        return <ProductsSkeletonCard key={index} />;
      })}
    </div>
  );
}
