"use client";

import { updateProduct } from "@/actions/product";
import FieldImageUpdate from "@/components/form/image-update-field";
import { FieldGroup } from "@/components/ui/field";
import { useUpdateProductForm } from "@/hooks/update-product.hook";
import { Product } from "@/lib/generated/prisma/client";
import { ProductServerResponse } from "@/types/global.type";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: ProductServerResponse = {
  success: false,
  message: undefined,
};

export function FormUpdateProduct({ product }: { product: Product }) {
  const [state, action] = useActionState(updateProduct, initialState);
  const form = useUpdateProductForm(product);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <div className="mb-6">
        <FieldImageUpdate
          imgSrc={product.image}
          name={product.name}
          id={product.id}
        />
      </div>

      <form
        action={action as never}
        // onSubmit={() => form.handleSubmit()}
      >
        <FieldGroup className="grid md:grid-cols-2">
          <div className="hidden">
            <form.AppField name="id">
              {(field) => <field.TextField type="text" />}
            </form.AppField>
          </div>

          <form.AppField name="product">
            {(field) => (
              <field.TextField
                type="text"
                label="Product Name"
                placeholder="Leather Armchair"
              />
            )}
          </form.AppField>

          <form.AppField name="company">
            {(field) => (
              <field.TextField
                type="text"
                label="Company"
                placeholder="HomeStyle"
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
              />
            )}
          </form.AppField>

          <div className="md:col-span-2">
            <form.AppField name="description">
              {(field) => (
                <field.TextAreaField
                  label="Description"
                  placeholder="Type product description here"
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
              <form.ButtonSubmit label="Update" />
              <form.ButtonReset label="Default Value" />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
