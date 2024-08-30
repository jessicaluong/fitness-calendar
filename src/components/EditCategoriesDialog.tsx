import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCalendarDataContext } from "@/lib/hooks";
import FormFieldInput from "./FormFieldInput";
import FormFieldSelect from "./FormFieldSelect";
import { COLORS } from "@/lib/types";

type EditCategoriesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditCategoriesDialog({
  open,
  onOpenChange,
}: EditCategoriesDialogProps) {
  const { handleSetCategories, categories } = useCalendarDataContext();

  const categoriesSchema = z.object({
    name: z.string().min(1, {
      message: "Required",
    }),
    color: z.string(),
    id: z.string(),
  });

  const formSchema = z.object({
    categs: z.array(categoriesSchema),
  });

  const defaultValues = {
    categs: categories || [],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categs",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Categories</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-2"
          >
            {fields.map((field, index) => (
              <div
                key={`${field.id}`}
                className="grid grid-cols-1 border-t-[2px] gap-2 pt-4"
              >
                <FormFieldInput
                  form={form}
                  name={`categs.${index}.name` as const}
                  label="Category name"
                  placeholder="Aerobics"
                />
                <FormFieldSelect
                  form={form}
                  name={`categs.${index}.color` as const}
                  label="Category color"
                  options={COLORS}
                  placeholder="Select a color"
                />
                <Button variant="secondary" onClick={() => remove(index)}>
                  Remove Category
                </Button>
              </div>
            ))}

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 border-t-[2px] pt-4 sm:border-0 sm:pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  append({
                    name: "",
                    color: "",
                    id: uuidv4(),
                  });
                }}
              >
                Add Category
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
