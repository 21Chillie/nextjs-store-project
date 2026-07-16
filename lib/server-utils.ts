"use server";

import { getSupabaseClient } from "@/lib/supabase";
import { ProductServerResponse } from "@/types/global.type";
import { ProductFormSchema } from "@/types/schema/form-schema";
import { auth } from "@clerk/nextjs/server";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { formatError, validateWithZod } from "./utils";

export async function checkAuth() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return userId;
}

export async function checkAdminAuth() {
  const userId = await checkAuth();

  if (userId !== process.env.ADMIN_USER_ID) {
    return redirect("/");
  }

  return userId;
}

// Supabase Bucket Action
const bucketName = "nextjs-store-bucket";

export async function imageUploadAction(file: File) {
  const fileName = `products/${Date.now()}-${file.name}`;

  // Upload image using getSupabaseClient
  const { error } = await getSupabaseClient()
    .storage.from(bucketName)
    .upload(fileName, file);

  if (error) {
    console.log(error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get URL
  const { data } = getSupabaseClient()
    .storage.from(bucketName)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteImageAction(url: string) {
  const imgUrl = url.split("/").pop();

  if (!imgUrl) {
    throw new Error(
      "Invalid URL: Could not extract specific asset filename target"
    );
  }

  const { error } = await getSupabaseClient()
    .storage.from(bucketName)
    .remove([`products/${imgUrl}`]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }

  console.log("Image deleted successfully.");
}

export async function updateImageAction(data: {
  oldImgUrl: string;
  newImageFile: File;
  productId: string;
}): Promise<ProductServerResponse> {
  await checkAdminAuth();
  console.log(data.newImageFile);
  const imgOnlySchema = ProductFormSchema.pick({ image: true });
  const validatedData = validateWithZod(imgOnlySchema, {
    image: data.newImageFile,
  });

  try {
    await deleteImageAction(data.oldImgUrl);
    const newImageUrl = await imageUploadAction(validatedData.image as File);

    await prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        image: newImageUrl,
      },
    });

    return { success: true, message: `Image updated successfully` };
  } catch (error) {
    return formatError(error);
  } finally {
    updateTag("product-detail");
  }
}
