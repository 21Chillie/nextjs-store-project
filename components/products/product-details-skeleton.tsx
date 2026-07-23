import ReviewCardSkeleton from "@/components/review/review-card-skeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <article>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product gallery */}
        <section className="mr-6">
          <div className="bg-foreground/10 rounded-xl p-2">
            <div className="bg-muted relative aspect-3/4 overflow-hidden rounded-2xl md:aspect-auto md:h-[600px]">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </section>

        {/* Product details */}
        <section>
          <header className="mb-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center text-base">
                <Skeleton className="mr-2 size-5" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="ml-1 h-4 w-20" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
          </header>

          <div className="mb-4">
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="mb-8">
            <Skeleton className="mb-4 h-6 w-32" />
            <Separator className="my-4" />
            <div className="prose prose-sm text-muted-foreground max-w-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="mb-4 h-3 w-full text-sm"
                />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-11 w-40" />
          </div>
        </section>
      </div>

      {/* Customer Review Section */}
      <section className="mt-12 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-28" />
          </div>
          <div className="bg-muted h-px w-full" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </article>
  );
}
