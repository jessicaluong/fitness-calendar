import { UseFormReturn } from "react-hook-form";
import { useCalendarDataContext } from "@/lib/hooks";
import { FormSchema } from "@/lib/formSchema";
import FormFieldInput from "./FormFieldInput";
import FormFieldSelect from "./FormFieldSelect";

type ActivityFormFieldsProps = { form: UseFormReturn<FormSchema> };

export default function ActivityFormFields({ form }: ActivityFormFieldsProps) {
  const { categories } = useCalendarDataContext();

  return (
    <>
      <FormFieldInput
        form={form}
        name="activity"
        label="Activity Name"
        placeholder="walking"
      />
      <FormFieldInput form={form} name="minutes" label="Minutes Performed" />
      <FormFieldSelect
        form={form}
        name="category"
        label="Category"
        options={categories}
      />
    </>
  );
}
