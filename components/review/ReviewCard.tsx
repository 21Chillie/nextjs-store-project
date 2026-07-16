import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Product, Review } from "@/lib/generated/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import { Activity } from "react";
import Comment from "./Comment";
import ReviewCardMenu from "./ReviewCardMenu";

type Props = Review & { product: Product };

export default async function ReviewCard({ data }: { data: Props }) {
  const { userId } = await auth();
  const { id, authorAvatar, authorName, createAt, rating, comment, clerkId } =
    data;
  const defaultAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  // Format rating with 1 decimal place (e.g., 5.0)
  const formattedRating = rating.toFixed(1);

  // Check if user session id is same as clerkId from database
  const fullname = userId === clerkId ? "You" : authorName;
  const userActionShow: boolean = userId === clerkId;

  return (
    <Card
      size="sm"
      className="flex min-h-35 flex-col justify-between">
      <CardContent className="flex items-start gap-3">
        <Image
          src={authorAvatar || defaultAvatar}
          alt={`${fullname} profile`}
          width={48}
          height={48}
          className="ring-border size-10 rounded-full object-cover ring-2"
        />

        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <h6 className="text-foreground text-base font-semibold">
              {fullname}
            </h6>

            <Activity mode={userActionShow ? "visible" : "hidden"}>
              <CardAction className="flex">
                <ReviewCardMenu id={id} />
              </CardAction>
            </Activity>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-muted-foreground mt-1 flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span className="text-xs">
                {createAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 stroke-amber-300" />
              <span className="text-foreground text-sm font-semibold">
                {formattedRating}
              </span>
            </div>
          </div>

          <Comment comment={comment || ""} />
        </div>
      </CardContent>
    </Card>
  );
}
