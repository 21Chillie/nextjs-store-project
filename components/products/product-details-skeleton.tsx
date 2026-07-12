import { Skeleton } from "@/components/ui/skeleton";

export default async function ProductDetailsSkeleton() {
  return (
    <article>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section
          aria-label="Product gallery"
          className="mr-6">
          <div className="bg-foreground/10 rounded-xl p-2">
            <figure className="bg-muted relative aspect-3/4 overflow-hidden rounded-2xl md:aspect-auto md:h-[600px]">
              <Skeleton className="h-full w-full rounded-xl" />
            </figure>
          </div>
        </section>

        <section aria-label="Product details">
          <header className="mb-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-20 shrink-0" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <Skeleton className="flex h-5 w-24 items-center" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </header>

          <div className="mb-4">
            <Skeleton className="text-2xl font-bold tracking-tight" />
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <Skeleton className="my-4 h-px w-full" />
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <Skeleton className="mb-4 h-32 text-sm text-pretty whitespace-pre-line" />
            </div>
          </div>

          <div>
            <Skeleton className="h-11 w-40 rounded-md" />
          </div>
        </section>
      </div>
    </article>
  );
}
