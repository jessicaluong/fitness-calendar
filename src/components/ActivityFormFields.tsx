import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CATEGORIES, FormSchema } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";

type ActivityFormFieldsProps = { form: UseFormReturn<FormSchema> };

export default function ActivityFormFields({ form }: ActivityFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="activity"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="grid grid-cols-4 sm:grid-cols-3 items-center gap-4">
              <FormLabel className="text-right">Activity Name</FormLabel>
              <FormControl className="col-span-3 sm:col-span-2">
                <Input placeholder="walking" {...field} />
              </FormControl>
            </div>
            <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="minutes"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="grid grid-cols-4 sm:grid-cols-3 items-center gap-4">
              <FormLabel className="text-right">Minutes Performed</FormLabel>
              <FormControl className="col-span-3 sm:col-span-2">
                <Input {...field} />
              </FormControl>
            </div>
            <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="grid grid-cols-4 sm:grid-cols-3 items-center gap-4">
              <FormLabel className="text-right">Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="col-span-3 sm:col-span-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
          </FormItem>
        )}
      />
    </>
  );
}
