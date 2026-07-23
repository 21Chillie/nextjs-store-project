"use server";

import { Cart } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/server-utils";
import { calculateCartTotals, formatError } from "@/lib/utils";
import { ProductServerResponse } from "@/types/global.type";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function fetchNumItemsInCart(userId: string): Promise<number> {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });
  cacheTag("num-items-in-cart");

  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart ?? 0;
}

export async function getUserCart(userId: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });

  cacheTag("user-cart-list");

  if (!userId) {
    return null;
  }

  const userCart = await prisma.cart.findUnique({
    where: {
      clerkId: userId,
    },

    include: {
      cartItems: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          product: {
            select: {
              image: true,
              name: true,
              id: true,
              price: true,
              company: true,
            },
          },
        },
      },
    },
  });

  return userCart;
}

export async function addToCartOrIncreaseAmount({
  productId,
  amount = 1,
}: {
  productId: string;
  amount?: number;
}): Promise<ProductServerResponse & { cart: Cart | null }> {
  try {
    const userId = await checkAuth();

    const updatedCart = await prisma.$transaction(async (tx) => {
      // Check existing user cart or create one
      let cart = await tx.cart.findUnique({
        where: { clerkId: userId },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { clerkId: userId },
        });
      }

      // Fetch target product to get the price
      const productPrice = await tx.product.findUnique({
        where: { id: productId },
        select: { price: true },
      });

      if (!productPrice) {
        throw new Error("Product not found");
      }

      // Upsert CartItem. Meaning:
      // Increase amount if already exist (productId and cartId match)
      // Otherwise create a new CartItem
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
        update: {
          amount: { increment: amount },
        },
        create: {
          cartId: cart.id,
          productId,
          amount: amount,
        },
      });

      const updatedItems = await tx.cartItem.findMany({
        where: { cartId: cart.id },
        include: { product: { select: { price: true } } },
      });

      const totals = calculateCartTotals(updatedItems, cart?.taxRate);

      return await tx.cart.update({
        where: { id: cart.id },
        data: totals,
        include: { cartItems: true },
      });
    });

    return {
      success: true,
      message: "Product has been added to cart",
      cart: updatedCart,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error);
      return {
        success: false,
        message: "Failed to product to cart: " + error.message,
        cart: null,
      };
    }
    return {
      success: false,
      message: "An unknown error occurred.",
      cart: null,
    };
  } finally {
    updateTag("num-items-in-cart");
    updateTag("user-cart-list");
  }
}

export async function deleteCartItem(
  id: string
): Promise<ProductServerResponse> {
  try {
    const userId = await checkAuth();

    return await prisma.$transaction(async (tx) => {
      const deletedItem = await tx.cartItem.delete({
        where: { id: id },
      });

      const updatedItems = await tx.cartItem.findMany({
        where: { cartId: deletedItem.cartId },
        include: { product: { select: { price: true } } },
      });

      const totals = calculateCartTotals(updatedItems);

      await tx.cart.update({
        where: { id: deletedItem.cartId, clerkId: userId },
        data: totals,
      });

      return {
        success: true,
        message: "Product successfully remove from cart",
      };
    });
  } catch (err) {
    return formatError(err);
  } finally {
    updateTag("num-items-in-cart");
    updateTag("user-cart-list");
  }
}

export async function updateCartItem({
  id,
  amount,
}: {
  id: string;
  amount: number;
}): Promise<ProductServerResponse> {
  try {
    const userId = await checkAuth();

    if (amount <= 0) {
      await deleteCartItem(id);
      updateTag("num-items-in-cart");

      return {
        success: false,
        message: "Product successfully remove from cart",
      };
    }

    return await prisma.$transaction(async (tx) => {
      const item = await tx.cartItem.update({
        where: { id },
        data: { amount },
      });

      const updatedItems = await tx.cartItem.findMany({
        where: { cartId: item.cartId },
        include: { product: { select: { price: true } } },
      });

      const totals = calculateCartTotals(updatedItems);

      await tx.cart.update({
        where: { id: item.cartId, clerkId: userId },
        data: totals,
      });

      return { success: true, message: "" };
    });
  } catch (err) {
    return formatError(err);
  } finally {
    updateTag("user-cart-list");
  }
}
