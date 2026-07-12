"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useFieldContext } from "@/hooks/create-form-hook";
import DynamicFieldDescription from "./field-errors";

type FieldProps = {
  description?: string;
  label: string;
  isDisabled?: boolean;
};

// NOTE: the default value for checkbox is "on" and null if not checked, so we use "true" to indicate checked and "false" to indicate unchecked

export default function CheckboxField({
  description,
  label,
  isDisabled = false,
}: FieldProps) {
  const { name, handleChange, state } = useFieldContext<boolean>();
  const isInvalid = state.meta.isTouched && state.meta.errors.length > 0;

  const isChecked = !!state.value;

  return (
    <FieldGroup>
      <Field
        orientation={"horizontal"}
        data-invalid={isInvalid}
        data-disabled={isDisabled}>
        {/* This guarantees that a string of "true" or "false" is always sent */}
        <input
          type="hidden"
          name={name}
          value={isChecked ? "true" : "false"}
          disabled={isDisabled}
        />

        {/* The visible UI checkbox component (remove the name attribute here) */}
        <Checkbox
          id={name}
          checked={isChecked}
          aria-invalid={isInvalid}
          onCheckedChange={(checked) => handleChange(!!checked)}
          disabled={isDisabled}
        />

        <FieldContent>
          <FieldLabel
            className="cursor-pointer capitalize select-none"
            htmlFor={name}>
            {label}
          </FieldLabel>

          <DynamicFieldDescription
            description={description}
            meta={state.meta}
            name={name}
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
