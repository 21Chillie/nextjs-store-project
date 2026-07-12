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

export function validateWithZod<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = prettifyError(result.error);
    throw new Error(errors);
  }

  return result.data;
}
