## 1. The Storage Utility File — `src/utils/supabase.ts`

First, create or append the `deleteImage` helper. We process the full public database URL using `split('/')` and `pop()` to clean off the domain routing so Supabase knows exactly which unique filename string to prune.

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = "products-bucket"; // Replace with your exact bucket name

/**
 * Parses a full public URL and deletes the corresponding object asset from the bucket.
 * @param url Full public storage URL string
 */
export function deleteImage(url: string) {
  // Extract filename at the end of the URL split trail
  const imageName = url.split("/").pop();

  if (!imageName) {
    throw new Error(
      "Invalid URL: Could not extract specific asset filename target",
    );
  }

  // .remove() takes an array of file path strings inside the targeted bucket container
  return supabase.storage.from(BUCKET_NAME).remove([imageName]);
}
```

---

## 2. Refactoring the Server Action — `src/app/actions.ts`

When deleting items, pass the target ID constraint to Prisma's `.delete()` execution. Prisma cleanly returns the complete deleted record, which contains the live state image reference string we need to delete from Supabase storage.

```ts
"use server";

import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

/**
 * Server Action to remove a product record from the DB and its paired image from Supabase Storage.
 * @param productId Unique identifier of the product target
 */
export async function deleteProductAction(productId: number) {
  try {
    // 1. Delete row from database (returns the complete row schema payload data)
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    // 2. Clear out orphan storage file using the retrieved image URL property reference
    if (deletedProduct.image) {
      const { data, error } = await deleteImage(deletedProduct.image);

      if (error) {
        console.error("Storage cleanup warning:", error.message);
        // Note: We don't fail the action here since the DB record is already successfully removed
      } else {
        console.log("Successfully purged asset from Supabase bucket:", data);
      }
    }

    // 3. Purge router cache lines to render updated lists instantly
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Delete operation failure:", error);
    return {
      success: false,
      error: "Failed to cleanly remove product instance",
    };
  }
}
```

---

## 3. Verification & Core Database Sync Checklist

To verify your environment is tracking this cleanup logic properly, run through this baseline validation cycle:

- **Bucket Policy Check:** Under **Storage > Policies** inside your Supabase dashboard workspace, ensure your target bucket has active policies granting full customization access (**Select, Insert, Update, and Delete**) for authenticated or anonymous operations. Without explicit `Delete` permissions, the database row will disappear but the storage asset will remain locked.
- **Network Isolation Sandbox:** Open a test window side-by-side with your Supabase Storage console panel. Create a fresh dummy product profile with an attached image, verify it populates your grid, and click your delete button. The image object should vanish from the cloud bucket folder within milliseconds of the database row being deleted.
