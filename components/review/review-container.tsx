import { getProductReviews } from "@/actions/reviews";
import { auth } from "@clerk/nextjs/server";
import ReviewCard from "./review-card";

type Props = { productId: string };

export default async function ReviewContainer({ productId }: Props) {
  const user = await auth();
  const userId = user.userId ?? "";
  const reviews = await getProductReviews(productId, userId);

  if (reviews.length === 0) {
    return (
      <div>
        <p className="text-foreground/50">No reviews in this product yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.id}>
          <ReviewCard data={review} />
        </div>
      ))}
    </div>
  );
}
