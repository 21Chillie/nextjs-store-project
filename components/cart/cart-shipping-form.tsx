"use client";

import { DialogClose } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useCreateOrderForm } from "@/hooks/create-order-form.hook";
import { useUser } from "@clerk/nextjs";
import { useRef } from "react";

export default function CartShippingForm() {
  const { user } = useUser();

  const form = useCreateOrderForm({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <>
      <DialogClose ref={closeRef} />
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  type="text"
                  disabled={true}
                  label="Email"
                  placeholder="johndoe@mail.com"
                />
              )}
            </form.AppField>

            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  type="text"
                  required={true}
                  label="Receive Name"
                  placeholder="John Doe"
                />
              )}
            </form.AppField>

            <form.AppField name="country">
              {(field) => (
                <field.TextField
                  type="text"
                  required={true}
                  label="Country"
                  placeholder="e.g. United States"
                />
              )}
            </form.AppField>

            <form.AppField name="city">
              {(field) => (
                <field.TextField
                  type="text"
                  required={true}
                  label="City"
                  placeholder="e.g. New York"
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name="address">
            {(field) => (
              <field.TextAreaField
                required={true}
                label="Address"
                placeholder="Streets, house/building No., apartment suite, postal code, etc."
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
