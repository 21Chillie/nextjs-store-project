"use client";
import { DialogClose } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useCreateReviewForm } from "@/hooks/create-review.hook";
import { useUser } from "@clerk/nextjs";
import { useRef } from "react";

type Props = {
  productId: string;
};

export default function ReviewForm({ productId }: Props) {
  const { user } = useUser();
  const form = useCreateReviewForm({
    authorAvatar: user?.imageUrl || "",
    authorName: user?.fullName || "Anonymous",
    productId,
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
    closeRef.current?.click();
  };

  return (
    <>
      <DialogClose ref={closeRef} />
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="hidden">
            <form.AppField name="productId">
              {(field) => <field.TextField type="text" />}
            </form.AppField>

            <form.AppField name="authorName">
              {(field) => <field.TextField type="text" />}
            </form.AppField>

            <form.AppField name="authorAvatar">
              {(field) => <field.TextField type="text" />}
            </form.AppField>
          </div>

          <form.AppField name="rating">
            {(field) => (
              <field.RatingInput
                label="Ratings"
                required={true}
              />
            )}
          </form.AppField>

          <form.AppField name="comment">
            {(field) => (
              <field.TextAreaField
                label="Comment"
                placeholder="Type your comment here"
              />
            )}
          </form.AppField>
        </FieldGroup>

        <div className="mt-8 flex justify-end gap-4 md:col-span-2">
          <form.AppForm>
            <form.ButtonSubmit label="Submit" />
            <form.ButtonReset label="Clear" />
          </form.AppForm>
        </div>
      </form>
    </>
  );
}
