"use server";

import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/server-utils";
import { validateWithZod } from "@/lib/utils";
import { ProductServerResponse } from "@/types/global.type";
import {
  ReviewFormSchema,
  ReviewFormSchemaType,
} from "@/types/schema/form-schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addReview(
  rawData: ReviewFormSchemaType
): Promise<ProductServerResponse> {
  try {
    const userId = await checkAuth();
    const validateData = validateWithZod(ReviewFormSchema, rawData);

    await prisma.review.create({
      data: {
        clerkId: userId,
        rating: validateData.rating,
        comment: validateData.comment,
        authorName: validateData.authorName,
        authorAvatar: validateData.authorAvatar,
        productId: validateData.productId,
      },
    });

    return { success: true, message: "Review added successfully" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to add review" };
  } finally {
    revalidatePath(`/products/${rawData.productId}`);
    revalidatePath(`/reviews`);
  }
}

export async function getProductReviews(productId: string) {
  const { userId } = await auth();

  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      // Order by clerkId to prioritize user reviews, then by creation date
      orderBy: [
        {
          clerkId: userId ? "asc" : "desc",
        },
        {
          createAt: "desc",
        },
      ],
      include: {
        product: true,
      },
    });

    return reviews;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductReviewsByUser() {
  const userId = await checkAuth();

  try {
    const result = await prisma.review.findMany({
      where: {
        clerkId: userId,
      },
      orderBy: {
        createAt: "desc",
      },
      include: {
        product: {
          select: { name: true, image: true, id: true },
        },
      },
    });

    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getUserReviewByProduct(productId: string) {
  const userId = await checkAuth();

  try {
    const userReview = await prisma.review.findFirst({
      where: {
        productId,
        clerkId: userId,
      },
    });

    if (!userReview) return null;

    return userReview;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getProductRating(productId: string) {
  const result = await prisma.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },

    where: {
      productId,
    },
  });

  return {
    rating: result[0]?._avg.rating ?? 0,
    ratingCount: result[0]?._count.rating ?? 0,
  };
}

export async function deleteReview({
  id,
  pathname,
}: {
  id: string;
  pathname: string;
}): Promise<ProductServerResponse> {
  const userId = await checkAuth();

  try {
    await prisma.review.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    return { success: true, message: "Review deleted successfully" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to delete review" };
  } finally {
    revalidatePath(pathname);
  }
}
