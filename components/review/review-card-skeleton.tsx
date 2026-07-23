import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCardSkeleton() {
  return (
    <Card
      size="sm"
      className="flex min-h-35 flex-col justify-between">
      <CardContent className="flex items-start gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-muted-foreground mt-1 flex items-center gap-1.5">
              <Skeleton className="size-3.5" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-4" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
