import ReviewsPageContainer from "@/components/review/reviews-page-container";
import { ReviewsPageSkeleton } from "@/components/review/reviews-page-skeleton";
import { Suspense } from "react";

export default function Reviews() {
  return (
    <Suspense fallback={<ReviewsPageSkeleton />}>
      <ReviewsPageContainer />
    </Suspense>
  );
}
