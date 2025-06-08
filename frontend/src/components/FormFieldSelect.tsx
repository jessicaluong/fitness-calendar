import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Color } from "@/lib/types";
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import Square from "./Square";
import { getColorClasses } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-provider";

type FormFieldSelectProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  options: Category[] | Color[];
  placeholder: string;
  colorOption?: boolean;
};

export default function FormFieldSelect<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  colorOption,
}: FormFieldSelectProps<TFieldValues>) {
  const { theme } = useTheme();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="grid grid-cols-4 sm:grid-cols-3 items-center gap-4">
            <FormLabel className="text-right">{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl className="col-span-3 sm:col-span-2">
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => {
                  const value = typeof option === "string" ? option : option.id;
                  const label =
                    typeof option === "string" ? option : option.name;
                  return (
                    <SelectItem key={value} value={value}>
                      {colorOption && (
                        <Square
                          color={getColorClasses(value, "calendar", theme)}
                          className="inline-block w-[8px] h-[8px] md:w-[10px] md:h-[10px] mr-2"
                        />
                      )}
                      <span>
                        {label.charAt(0).toUpperCase() + label.slice(1)}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
        </FormItem>
      )}
    />
  );
}
