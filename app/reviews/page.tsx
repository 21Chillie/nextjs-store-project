import ReviewsPageContainer from "@/components/review/ReviewsPageContainer";
import { Suspense } from "react";

export default function Reviews() {
  return (
    <Suspense>
      <ReviewsPageContainer />
    </Suspense>
  );
}
