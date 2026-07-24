import SectionTitle from "@/components/global/section-title";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartContainerSkeleton() {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <section className="space-y-6">
      <SectionTitle title="My Carts" />

      <div className="grid gap-6 md:grid-cols-12">
        {/* Cart List Section - Left Side */}
        <div className="space-y-6 md:col-span-8">
          {skeletonItems.map((_, index) => (
            <Item
              key={`skeleton-item-${index}`}
              variant={"outline"}>
              <ItemMedia>
                <Skeleton className="aspect-square size-22 rounded-md" />
              </ItemMedia>

              <ItemContent className="space-y-3">
                <div>
                  <Skeleton className="h-6 w-48" />
                </div>

                <div className="font-bold">
                  <Skeleton className="h-4 w-32" />
                </div>
              </ItemContent>

              <ItemActions>
                <Skeleton className="h-8 w-24" />

                <Skeleton className="h-8 w-8" />
              </ItemActions>
            </Item>
          ))}
        </div>

        {/* Cart Total Section - Right Side */}
        <div className="md:col-span-4">
          <Card
            size="sm"
            className="w-full">
            <CardContent>
              <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="text-muted-foreground">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="text-muted-foreground">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="text-muted-foreground">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="font-bold">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="text-muted-foreground font-bold">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t">
              <Skeleton className="block h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
