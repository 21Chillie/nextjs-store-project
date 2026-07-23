import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Separator } from "@/components/ui/separator";

type Props = {
  count?: number;
};

export function ReviewsPageSkeleton({ count = 6 }: Props) {
  return (
    <section className="space-y-8">
      <div className="space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <Separator />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card
            key={i}
            size="sm"
            className="flex min-h-74 flex-col">
            <CardHeader className="flex items-center justify-between border-b">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-16 w-16 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px] font-bold" />
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-12 w-full" />
            </CardContent>
            <CardFooter className="border-t">
              <Skeleton className="h-8 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
