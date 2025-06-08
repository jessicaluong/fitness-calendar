import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";

type FormFieldInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
};

export default function FormFieldInput<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: FormFieldInputProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="grid grid-cols-4 sm:grid-cols-3 items-center gap-4">
            <FormLabel className="text-right">{label}</FormLabel>
            <FormControl className="col-span-3 sm:col-span-2">
              <Input
                placeholder={placeholder}
                {...field}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                autoComplete="off"
              />
            </FormControl>
          </div>
          <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
        </FormItem>
      )}
    />
  );
}
