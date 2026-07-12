import { ButtonReset, ButtonSubmit } from "@/components/form/button-form";
import CheckboxField from "@/components/form/checkbox-field";
import FileField from "@/components/form/file-field";
import NumberField from "@/components/form/number-field";
import TextAreaField from "@/components/form/text-area-field";
import TextField from "@/components/form/text-field";
import { fieldContext, formContext } from "@/hooks/create-form-hook";
import { ProductFormOpts } from "@/lib/form-options";
import { ProductFormSchema } from "@/types/schema/form-schema";
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

export function useCreateProductForm() {
  const form = useAppForm({
    ...ProductFormOpts,
    validationLogic: revalidateLogic({
      mode: "change",
      modeAfterSubmission: "blur",
    }),
    validators: {
      onDynamic: ProductFormSchema,
    },
    // onSubmit: async ({ value }) => {
    //   console.log(value);
    // },
  });

  return form;
}
