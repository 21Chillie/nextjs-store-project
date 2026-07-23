import { getProductReviewsByUser } from "@/actions/reviews";
import SectionTitle from "@/components/global/section-title";
import ReviewsPageCard from "@/components/review/reviews-page-card";
import { checkAuth } from "@/lib/server-utils";

export default async function ReviewsPageContainer() {
  const userId = await checkAuth();
  const reviews = await getProductReviewsByUser(userId);

  return (
    <section
      id="section-reviews"
      className="space-y-8">
      <SectionTitle title="My Reviews" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <div key={review.id}>
                <ReviewsPageCard review={review} />
              </div>
            );
          })
        ) : (
          <p className="text-muted-foreground">
            No reviews has been written yet.
          </p>
        )}
      </div>
    </section>
  );
}
