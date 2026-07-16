"use server";

import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/server-utils";
import { formatError } from "@/lib/utils";
import { ProductServerResponse } from "@/types/global.type";
import { cacheTag, revalidatePath, updateTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function getFavoriteDataById(data: {
  productId: string;
}): Promise<boolean> {
  try {
    const userId = await checkAuth();
    const favorite = await prisma.favorite.findUnique({
      where: {
        clerkId_productId: {
          clerkId: userId,
          productId: data.productId,
        },
      },
      select: {
        id: true,
      },
    });

    return !!favorite;
  } catch {
    return false;
  }
}

export async function toggleFavorite(data: {
  productId: string;
  pathName: string;
}): Promise<ProductServerResponse> {
  try {
    const userId = await checkAuth();

    const isFavorite = await getFavoriteDataById({ productId: data.productId });

    if (isFavorite) {
      await prisma.favorite.delete({
        where: {
          clerkId_productId: {
            clerkId: userId,
            productId: data.productId,
          },
        },
      });

      return {
        success: true,
        message: "Product removed from favorites",
      };
    }

    await prisma.favorite.create({
      data: {
        clerkId: userId,
        productId: data.productId,
      },
    });

    return {
      success: true,
      message: "Product added to favorites",
    };
  } catch (err) {
    return formatError(err);
  } finally {
    revalidatePath(data.pathName);
    updateTag("product-favorites");
  }
}

export async function getUserFavoritesData(userId: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });

  cacheTag("product-favorites");

  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        clerkId: userId,
      },
      include: {
        product: true,
      },
    });

    return favorites;
  } catch {
    return [];
  }
}

export async function getFavoritesWithAuth() {
  const userId = await checkAuth();
  return getUserFavoritesData(userId);
}
