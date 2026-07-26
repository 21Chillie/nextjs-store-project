"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/hooks/create-form-hook";
import { Upload } from "lucide-react";

type ButtonProps = {
  label: string;
  isDisabled?: boolean;
};

export function ButtonSubmit({ label }: ButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => (
        <Button
          variant={"default"}
          type="submit"
          className={"cursor-pointer"}
          disabled={isSubmitting || !canSubmit}>
          {isSubmitting ? (
            <>
              Submitting
              <Spinner data-icon="inline-start" />
            </>
          ) : (
            <>
              {label} <Upload />
            </>
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}

export function ButtonReset({ label, isDisabled = false }: ButtonProps) {
  const form = useFormContext();

  return (
    <Button
      className={"cursor-pointer"}
      variant={"secondary"}
      disabled={isDisabled}
      onClick={() => form.reset()}>
      {label}
    </Button>
  );
}
