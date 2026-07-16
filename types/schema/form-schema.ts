import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProductFormSchema = z.object({
  product: z.string().min(1, { error: "Product name field is required" }),
  company: z.string().min(1, { error: "Company field is required" }),
  price: z
    .number({ error: "Price field must be a number" })
    .min(1, { error: "Price field value must be atleast $1" }),
  image: z
    .file({ error: "Image field is required" })
    .mime(ACCEPTED_IMAGE_TYPES, {
      error: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    })
    .max(MAX_FILE_SIZE, { error: "Max image size is 5MB." })
    .nullable(),
  description: z.string().min(1, { error: "Description field is required" }),
  featured: z.boolean(),
});

export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

export const extendProductFormSchema = ProductFormSchema.extend({
  id: z.string(),
});
export type ExtendProductFormSchemaType = z.infer<
  typeof extendProductFormSchema
>;

export const ReviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, { error: "Rating must be at least 1" })
    .max(5, "Rating must be at most 5"),
  comment: z.string().optional().or(z.literal("")),
  authorName: z.string().min(1, { error: "Author name field is required" }),
  authorAvatar: z.string().optional().or(z.literal("")),
  productId: z.string().min(1, { error: "Product ID field is required" }),
});

export type ReviewFormSchemaType = z.infer<typeof ReviewFormSchema>;
