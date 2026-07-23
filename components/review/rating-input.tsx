import DynamicFieldDescription from "@/components/form/field-errors";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/hooks/create-form-hook";
import { Activity } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  fieldDescription?: string;
  required?: boolean;
};

export default function RatingInput({
  label,
  placeholder,
  isDisabled = false,
  required = false,
  fieldDescription,
}: Props) {
  const { name, state, handleChange, handleBlur } = useFieldContext<number>();
  const values = Array.from({ length: 5 }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  })).reverse();

  return (
    <Field>
      <Activity mode={label ? "visible" : "hidden"}>
        <FieldLabel htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      </Activity>

      <Select
        name={name}
        items={values}
        disabled={isDisabled}
        value={state.value || 5}
        onValueChange={(val) => {
          handleChange(val || 5);
          handleBlur();
        }}>
        <SelectTrigger className={"w-full max-w-48"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ratings</SelectLabel>
            {values.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <DynamicFieldDescription
        meta={state.meta}
        name={name}
        description={fieldDescription}
      />
    </Field>
  );
}
