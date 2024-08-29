import { FormSchema } from "@/lib/formSchema";
import { UseFormReturn } from "react-hook-form";
import FormFieldInput from "./FormFieldInput";

type ExerciseFormFieldsProps = {
  form: UseFormReturn<FormSchema>;
  index: number;
};

export default function ExerciseFormFields({
  form,
  index,
}: ExerciseFormFieldsProps) {
  return (
    <>
      <FormFieldInput
        form={form}
        name={`exercises.${index}.name` as const}
        label="Exercise name"
        placeholder="Bench Press"
      />
      <FormFieldInput
        form={form}
        name={`exercises.${index}.sets` as const}
        label="Sets"
        placeholder="3"
      />
      <FormFieldInput
        form={form}
        name={`exercises.${index}.reps` as const}
        label="Reps"
        placeholder="10"
      />
      <FormFieldInput
        form={form}
        name={`exercises.${index}.weight` as const}
        label="Weight (in lbs)"
        placeholder="135"
      />
    </>
  );
}
