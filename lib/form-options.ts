import { type CreateProductSchemaType } from "@/types/schema/form-schema";
import { formOptions } from "@tanstack/react-form-nextjs";

const createProductValues: CreateProductSchemaType = {
  product: "",
  company: "",
  price: 0,
  image: null,
  description: "",
  featured: false,
};

export const ProductFormOpts = formOptions({
  defaultValues: createProductValues,
});
