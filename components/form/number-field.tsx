"use client";

import DynamicFieldDescription from "@/components/form/field-errors";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/hooks/create-form-hook";
import { formatCurrency } from "@/lib/utils";

type FieldProps = {
  type: "number";
  subType?: "default" | "price";
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fieldDescription?: string;
  defaultValues?: number;
  icon?: React.JSX.Element;
};

export default function NumberField({
  type,
  subType = "default",
  label,
  placeholder,
  required = false,
  disabled = false,
  fieldDescription,
  defaultValues,
  icon,
}: FieldProps) {
  const { name, state, handleBlur, handleChange } = useFieldContext<number>();

  const isInvalid = state.meta.isDirty && state.meta.errors.length > 0;

  return (
    <Field
      data-disabled={disabled}
      data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={name}>
          {subType === "price"
            ? `Price (${formatCurrency(state.value || 0)})`
            : label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <InputGroup>
        <InputGroupInput
          aria-invalid={isInvalid}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          defaultValue={defaultValues}
          value={state.value}
          onBlur={handleBlur}
          min={0}
          onChange={(e) => handleChange(e.target.valueAsNumber || 0)}
        />

        {icon && (
          <InputGroupAddon align={"inline-start"}>{icon}</InputGroupAddon>
        )}
      </InputGroup>

      <DynamicFieldDescription
        name={name}
        meta={state.meta}
        description={fieldDescription}
      />
    </Field>
  );
}
