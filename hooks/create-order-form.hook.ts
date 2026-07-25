import { createOrderFromCart } from "@/actions/order";
import { ButtonReset, ButtonSubmit } from "@/components/form/button-form";
import TextAreaField from "@/components/form/text-area-field";
import TextField from "@/components/form/text-field";
import { fieldContext, formContext } from "@/hooks/create-form-hook";
import {
  OrderFormSchema,
  OrderFormSchemaType,
} from "@/types/schema/form-schema";
import { createFormHook, revalidateLogic } from "@tanstack/react-form-nextjs";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextAreaField },
  formComponents: { ButtonSubmit, ButtonReset },
});

export function useCreateOrderForm({
  name,
  email,
}: Pick<OrderFormSchemaType, "name" | "email">) {
  const defaultValues: OrderFormSchemaType = {
    name: name,
    email: email,
    address: "",
    city: "",
    country: "",
  };

  const form = useAppForm({
    defaultValues,
    validationLogic: revalidateLogic({
      mode: "change",
      modeAfterSubmission: "blur",
    }),
    validators: {
      onDynamic: OrderFormSchema,
    },

    onSubmit: async ({ value }) => {
      const res = await createOrderFromCart(value);

      if (res.success) {
        toast.success(res.message);
        redirect("/orders");
      } else {
        toast.error(res.message);
      }
    },
  });

  return form;
}
