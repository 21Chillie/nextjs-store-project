import { CartItemWithProductPrice } from "@/types/global.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prettifyError, ZodType } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatCurrency(amount?: number): string {
  const value = amount || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(date: Date) {
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateString;
}

export function validateWithZod<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = prettifyError(result.error);
    throw new Error(errors);
  }

  return result.data;
}

export async function formatError(error: unknown) {
  if (error instanceof Error) {
    console.error("Error: ", error);
    return { success: false, message: error.message };
  }

  console.error("Unknown Error: ", error);
  return { success: false, message: "An unknown error occurred." };
}

export function calculateCartTotals(
  updatedItems: CartItemWithProductPrice[],
  taxRate: number = 0.1
) {
  const numItemsInCart = updatedItems.length;
  const cartTotal = updatedItems.reduce(
    (acc, item) => acc + item.product.price * item.amount,
    0
  );

  const shipping = cartTotal > 0 ? 5 : 0;
  const tax = Math.round(cartTotal * taxRate);
  const orderTotal = cartTotal + shipping + tax;

  return {
    numItemsInCart,
    cartTotal,
    shipping,
    tax,
    orderTotal,
  };
}

export async function fetchStripeClientSecret({
  orderId,
  email,
}: {
  orderId?: string;
  email?: string;
}): Promise<string> {
  try {
    if (!orderId || !email) {
      throw new Error("Missing order information or email.");
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, email }),
    });

    if (!res.ok) {
      const error = (await res.json()) as { message: string };
      throw new Error(error.message);
    }

    const data = (await res.json()) as { clientSecret: string };

    return data.clientSecret;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown error during checkout");
  }
}
