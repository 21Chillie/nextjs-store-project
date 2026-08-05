"use server";

import type { OrderStatus } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { protectAdminRoute, protectRoute } from "@/lib/protect-route";
import { formatError } from "@/lib/utils";
import { ProductServerResponse } from "@/types/global.type";
import { OrderFormSchemaType } from "@/types/schema/form-schema";
import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";

export async function createOrderFromCart(
  shippingInfo: OrderFormSchemaType
): Promise<ProductServerResponse> {
  try {
    const userId = await protectRoute();

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
    updateTag("user-order-list");
    revalidatePath("/admin/sales");
  }
}

export async function fetchUserOrder({ userId }: { userId: string }) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });
  cacheTag("user-order-list");

  try {
    const order = await prisma.order.findMany({
      where: {
        clerkId: userId,
        isAdminOnly: false,
      },
      orderBy: {
        createdAt: "desc",
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

export async function fetchUserOrderById({ orderId }: { orderId: string }) {
  const userId = await protectRoute();

  const orders = await prisma.order.findUnique({
    where: {
      clerkId: userId,
      id: orderId,
    },
    include: { orderItems: { include: { product: true } } },
  });

  return orders;
}

export async function fetchAdminSalesOrder() {
  await protectAdminRoute();

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

export async function updateOrderStatus({
  status,
  orderId,
  customMessage,
}: {
  status: OrderStatus;
  orderId: string;
  customMessage: string;
}): Promise<ProductServerResponse> {
  const userId = await protectRoute();

  try {
    console.log(`Update status of ORDER ID ${orderId}`);
    console.log(status);
    await prisma.order.update({
      where: {
        id: orderId,
        clerkId: userId,
      },
      data: {
        status,
      },
    });

    return { success: false, message: customMessage };
  } catch (err) {
    console.error(err);
    return formatError(err);
  } finally {
    updateTag("user-order-list");
    revalidatePath("/admin/sales");
  }
}

export async function deleteUserOrder({
  status,
  orderId,
}: {
  status: OrderStatus;
  orderId: string;
}): Promise<ProductServerResponse> {
  const userId = await protectRoute();
  try {
    console.log(`Deleting ORDER ID ${orderId}`);
    console.log(status);

    if (status === "COMPLETED") {
      await prisma.order.update({
        where: {
          id: orderId,
          clerkId: userId,
        },
        data: {
          isAdminOnly: true,
        },
      });

      return { success: true, message: "Order deleted successfully" };
    }

    await prisma.order.delete({
      where: {
        id: orderId,
        clerkId: userId,
      },
    });

    return { success: true, message: "Order deleted successfully" };
  } catch (err) {
    console.error(err);
    return formatError(err);
  } finally {
    updateTag("user-order-list");
    revalidatePath("/admin/sales");
  }
}
