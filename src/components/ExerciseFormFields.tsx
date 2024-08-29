import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/lib/formSchema";
import { UseFormReturn } from "react-hook-form";

type ExerciseFormFieldsProps = {
  form: UseFormReturn<FormSchema>;
  index: number;
};

const exerciseFields = [
  { name: "name", label: "Exercise name", placeholder: "Bench Press" },
  { name: "sets", label: "Sets", placeholder: "3" },
  { name: "reps", label: "Reps", placeholder: "10" },
  { name: "weight", label: "Weight (in lbs)", placeholder: "135" },
];

export default function ExerciseFormFields({
  form,
  index,
}: ExerciseFormFieldsProps) {
  return (
    <>
      {exerciseFields.map((exerciseField) => (
        <FormField
          key={`exercises.${index}.${exerciseField.name}`}
          control={form.control}
          name={
            `exercises.${index}.${exerciseField.name}` as
              | `exercises.${number}.name`
              | `exercises.${number}.sets`
              | `exercises.${number}.reps`
              | `exercises.${number}.weight`
          }
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="grid grid-cols-4 sm:grid-cols-3 items-center gap-4">
                <FormLabel className="text-right">
                  {exerciseField.label}
                </FormLabel>
                <FormControl className="col-span-3 sm:col-span-2">
                  <Input
                    type={exerciseField.name === "name" ? "text" : "number"}
                    placeholder={exerciseField.placeholder}
                    {...field}
                    // onChange={(e) => {
                    //   const value =
                    //     exerciseField.name === "name"
                    //       ? e.target.value
                    //       : e.target.valueAsNumber;
                    //   field.onChange(value);
                    // }}
                  />
                </FormControl>
              </div>
              <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
