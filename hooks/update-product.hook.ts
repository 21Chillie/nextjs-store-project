import { ButtonReset, ButtonSubmit } from "@/components/form/button-form";
import CheckboxField from "@/components/form/checkbox-field";
import FileField from "@/components/form/file-field";
import NumberField from "@/components/form/number-field";
import TextAreaField from "@/components/form/text-area-field";
import TextField from "@/components/form/text-field";
import { fieldContext, formContext } from "@/hooks/create-form-hook";
import { Product } from "@/lib/generated/prisma/client";
import { extendProductFormSchema, ExtendProductFormSchemaType } from "@/types/schema/form-schema";
import { createFormHook, revalidateLogic } from "@tanstack/react-form-nextjs";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    NumberField,
    FileField,
    TextAreaField,
    CheckboxField,
  },
  formComponents: { ButtonSubmit, ButtonReset },
});

export function useUpdateProductForm(product: Product) {
  const defaultValues: ExtendProductFormSchemaType = {
    product: product.name,
    company: product.company,
    price: product.price,
    image: null,
    description: product.description,
    featured: product.featured,
    id: product.id,
  };

  const form = useAppForm({
    defaultValues,
    validationLogic: revalidateLogic({
      mode: "change",
      modeAfterSubmission: "blur",
    }),
    validators: {
      onDynamic: extendProductFormSchema,
    },
  });

  return form;
}
