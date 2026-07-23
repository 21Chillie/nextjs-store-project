import { getUserReviewByProduct } from "@/actions/reviews";
import ReviewInput from "@/components/review/review-input";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/lib/generated/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { Activity } from "react";

export default async function ProductReviews({
  productId,
}: {
  productId: string;
}) {
  const { userId } = await auth();
  let isUserReviewAvailable: Review | null = null;

  // Only fetch user review if they're logged in
  if (userId) {
    isUserReviewAvailable = await getUserReviewByProduct(productId);
  }

  // Hide ReviewInput if user is not logged in OR already has a review
  const showReviewInput = userId && !isUserReviewAvailable;

  return (
    <>
      <header className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-medium tracking-tight capitalize">
            Customer Review
          </h2>

          <Activity mode={showReviewInput ? "visible" : "hidden"}>
            <ReviewInput productId={productId} />
          </Activity>
        </div>
        <Separator />
      </header>
    </>
  );
}
