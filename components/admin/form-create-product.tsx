"use client";

import { addProduct } from "@/actions/product";
import { FieldGroup } from "@/components/ui/field";
import { useCreateProductForm } from "@/hooks/create-product.hook";
import { ProductServerResponse } from "@/types/global.type";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: ProductServerResponse = {
  success: false,
  message: undefined,
};

export function FormCreateProduct() {
  const [state, action] = useActionState(addProduct, initialState);
  const form = useCreateProductForm();

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={action as never}
      onSubmit={() => form.handleSubmit()}>
      <FieldGroup className="grid md:grid-cols-2">
        <form.AppField name="product">
          {(field) => (
            <field.TextField
              type="text"
              label="Product Name"
              placeholder="Leather Armchair"
              required={true}
            />
          )}
        </form.AppField>

        <form.AppField name="company">
          {(field) => (
            <field.TextField
              type="text"
              label="Company"
              placeholder="HomeStyle"
              required={true}
            />
          )}
        </form.AppField>

        <form.AppField name="price">
          {(field) => (
            <field.NumberField
              type="number"
              subType="price"
              label={"Price"}
              placeholder="100"
              required={true}
            />
          )}
        </form.AppField>

        <form.AppField name="image">
          {(field) => (
            <field.FileField
              type="file"
              label="Product Image"
              accept="image/*"
              fieldDescription="Must be a PNG, JPEG or WebP file and less than 5MB"
              required={true}
            />
          )}
        </form.AppField>

        <div className="md:col-span-2">
          <form.AppField name="description">
            {(field) => (
              <field.TextAreaField
                label="Description"
                placeholder="Type product description here"
                required={true}
                className="h-48"
              />
            )}
          </form.AppField>
        </div>

        <form.AppField name="featured">
          {(field) => <field.CheckboxField label="featured products" />}
        </form.AppField>

        <div className="flex gap-4 md:col-span-2">
          <form.AppForm>
            <form.ButtonSubmit label="Submit" />
            <form.ButtonReset label="Clear" />
          </form.AppForm>
        </div>
      </FieldGroup>
    </form>
  );
}
