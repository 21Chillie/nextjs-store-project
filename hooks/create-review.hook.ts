import { addReview } from "@/actions/reviews";
import { ButtonReset, ButtonSubmit } from "@/components/form/button-form";
import TextAreaField from "@/components/form/text-area-field";
import TextField from "@/components/form/text-field";
import RatingInput from "@/components/review/RatingInput";
import {
  ReviewFormSchema,
  ReviewFormSchemaType,
} from "@/types/schema/form-schema";
import { createFormHook } from "@tanstack/react-form-nextjs";
import { toast } from "sonner";
import { fieldContext, formContext } from "./create-form-hook";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextAreaField, TextField, RatingInput },
  formComponents: { ButtonSubmit, ButtonReset },
});

export function useCreateReviewForm({
  authorName,
  authorAvatar,
  productId,
}: {
  authorName: string;
  authorAvatar: string;
  productId: string;
}) {
  const defaultValues: ReviewFormSchemaType = {
    rating: 5,
    comment: "",
    authorName,
    authorAvatar,
    productId,
  };

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: ReviewFormSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await addReview(value);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
  });

  return form;
}
