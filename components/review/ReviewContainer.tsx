import { getProductReviews } from "@/actions/reviews";
import ReviewCard from "./ReviewCard";

type Props = { productId: string };

export default async function ReviewContainer({ productId }: Props) {
  const reviews = await getProductReviews(productId);

  if (reviews.length === 0) {
    return (
      <div>
        <p className="text-foreground/50">No reviews in this product yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.id}>
          <ReviewCard data={review} />
        </div>
      ))}
    </div>
  );
}
