"use client";

import DynamicFieldDescription from "@/components/form/field-errors";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/hooks/create-form-hook";

type FieldProps = {
  type: "text" | "email" | "search" | "url";
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fieldDescription?: string;
  defaultValues?: string;
  icon?: React.JSX.Element;
};

export default function NumberField({
  type,
  label,
  placeholder,
  required = false,
  disabled = false,
  fieldDescription,
  defaultValues,
  icon,
}: FieldProps) {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();

  const isInvalid = state.meta.isDirty && state.meta.errors.length > 0;

  return (
    <Field
      data-disabled={disabled}
      data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
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
          value={state.value ?? ""}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
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
