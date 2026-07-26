"use server";

import prisma from "@/lib/prisma";
import { checkAdminAuth, checkAuth } from "@/lib/server-utils";
import { formatError } from "@/lib/utils";
import { ProductServerResponse } from "@/types/global.type";
import { OrderFormSchemaType } from "@/types/schema/form-schema";
import { updateTag } from "next/cache";

export async function createOrderFromCart(
  shippingInfo: OrderFormSchemaType
): Promise<ProductServerResponse> {
  try {
    const userId = await checkAuth();

    return await prisma.$transaction(async (tx) => {
      console.log("Finding current cart...");
      const currentCart = await tx.cart.findUnique({
        where: { clerkId: userId },
        include: {
          cartItems: {
            include: { product: true },
          },
        },
      });

      if (!currentCart || currentCart.cartItems.length === 0) {
        throw new Error("Cart is empty!");
      }

      // Product data snapshot mapping
      console.log("Mapping product data..."); // Debug log, remove later
      const productData = currentCart.cartItems.map((item) => {
        return {
          productId: item.productId,
          productName: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.amount,
        };
      });

      // Payment info not yet been added,
      // User not yet been charged
      console.log(`Creating order... (${currentCart.id}`); // Debug log, remove later
      const order = await tx.order.create({
        data: {
          clerkId: userId,
          subTotal: currentCart.cartTotal,
          shipping: currentCart.shipping,
          tax: currentCart.tax,
          orderTotal: currentCart.orderTotal,
          numItemsInCart: currentCart.numItemsInCart,

          name: shippingInfo.name,
          email: shippingInfo.email,
          address: shippingInfo.address,
          city: shippingInfo.city,
          country: shippingInfo.country,

          orderItems: {
            createMany: { data: productData },
          },
        },
      });
      // Debug log, remove later
      console.log(`Order created: ${order.id}, trying to delete old cart`);

      const deleteOldCart = await tx.cart.delete({
        where: { id: currentCart.id, clerkId: userId },
      });
      console.log(`Old cart deleted: ${deleteOldCart.id}`); // Debug, remove later

      return { success: true, message: "Order placed successfully!" };
    });
  } catch (err) {
    console.error(err);
    return formatError(err);
  } finally {
    updateTag("num-items-in-cart");
    updateTag("user-cart-list");
  }
}

export async function fetchUserOrder() {
  const userId = await checkAuth();

  try {
    const order = await prisma.order.findMany({
      where: {
        clerkId: userId,
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchAdminSalesOrder() {
  await checkAdminAuth();

  try {
    const order = await prisma.order.findMany({
      where: {
        isPaid: true,
        status: "COMPLETED",
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  } catch (err) {
    console.error(err);
    return [];
  }
}
