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
  type: "file";
  label?: string;
  required?: boolean;
  disabled?: boolean;
  fieldDescription?: string;
  icon?: React.JSX.Element;
  accept?: string;
};

export default function FileField({
  type,
  label,
  required = false,
  disabled = false,
  fieldDescription,
  icon,
  accept,
}: FieldProps) {
  const { name, state, handleBlur, handleChange } =
    useFieldContext<File | null>();

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
          accept={accept}
          disabled={disabled}
          required={required}
          onBlur={handleBlur}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              handleChange(files[0]);
            } else {
              handleChange(null);
            }
          }}
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
