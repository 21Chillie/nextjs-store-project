"use server";

import prisma from "@/lib/prisma";
import {
  checkAdminAuth,
  deleteImageAction,
  imageUploadAction,
} from "@/lib/server-utils";
import { formatError, validateWithZod } from "@/lib/utils";
import { ProductServerResponse } from "@/types/global.type";
import {
  extendProductFormSchema,
  ExtendProductFormSchemaType,
  ProductFormSchema,
  ProductFormSchemaType,
} from "@/types/schema/form-schema";
import { cacheTag, revalidatePath, updateTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { redirect } from "next/navigation";

// ---------- READ ACTIONS ----------
export async function getFeaturedProduct() {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });

  cacheTag("featured-product");

  const featuredProduct = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });

  return featuredProduct;
}

export async function searchProducts(query: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });
  cacheTag("products-stream", `search-${query}`);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return products;
}

export async function productById(id: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });

  cacheTag("product-detail", id);

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) redirect("/");

  return product;
}

export async function getAllProduct() {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 1200,
  });

  cacheTag("product-list");

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

// ---------- WRITE ACTIONS ----------
export async function deleteProductById(
  productId: string
): Promise<ProductServerResponse> {
  await checkAdminAuth();

  try {
    const product = await prisma.product.delete({
      where: { id: productId },
    });

    await deleteImageAction(product.image);

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return formatError(error);
  } finally {
    updateTag("product-list");
    revalidatePath("/products");
    revalidatePath("/");
  }
}

export async function addProduct(
  prev: unknown,
  formData: FormData
): Promise<ProductServerResponse> {
  const userId = await checkAdminAuth();
  const rawData = Object.fromEntries(formData.entries());

  // * Need manually parsed both featured and price property
  // * By default both value are string and need to convert to boolean and number
  const featured = Boolean(rawData.featured);
  const price = parseInt(rawData.price);

  try {
    const validatedData = validateWithZod<ProductFormSchemaType>(
      ProductFormSchema,
      { ...rawData, featured, price }
    );

    const imgSrc = await imageUploadAction(validatedData.image as File);

    await prisma.product.create({
      data: {
        name: validatedData.product,
        company: validatedData.company,
        description: validatedData.description,
        featured: validatedData.featured,
        image: imgSrc,
        price: validatedData.price,
        clerkId: userId,
      },
    });

    return { success: true, message: "Product added successfully" };
  } catch (err) {
    return formatError(err);
  } finally {
    updateTag("product-list");
    updateTag("products-stream");
    revalidatePath("/");
  }
}

export async function updateProduct(
  prev: unknown,
  formData: FormData
): Promise<ProductServerResponse> {
  const userId = await checkAdminAuth();
  const rawData = Object.fromEntries(formData.entries());
  const featured = Boolean(rawData.featured);
  const price = parseInt(rawData.price);

  try {
    const validatedData = validateWithZod<ExtendProductFormSchemaType>(
      extendProductFormSchema,
      { ...rawData, featured, price, image: null }
    );

    await prisma.product.update({
      where: {
        id: validatedData.id,
      },
      data: {
        name: validatedData.product,
        company: validatedData.company,
        description: validatedData.description,
        featured: validatedData.featured,
        price: validatedData.price,
        clerkId: userId,
      },
    });

    return { success: true, message: "Product updated successfully" };
  } catch (err) {
    return formatError(err);
  } finally {
    updateTag("product-list");
  }
}
