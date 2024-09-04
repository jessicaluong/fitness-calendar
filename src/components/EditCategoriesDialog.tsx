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

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "categs",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSetCategories(values.categs);
    onOpenChange(false);
    form.reset(defaultValues);
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
                className={`grid grid-cols-1 border-b-[2px] gap-2 pb-4 ${
                  index === fields.length - 1 ? "sm:border-b-0 sm:pb-0" : ""
                }`}
              >
                <FormFieldInput
                  form={form}
                  name={`categs.${index}.name` as const}
                  label="Category Name"
                  placeholder="Aerobics"
                />
                <FormFieldSelect
                  form={form}
                  name={`categs.${index}.color` as const}
                  label="Category Color"
                  options={COLORS}
                  placeholder="Select a color"
                  colorOption
                />
              </div>
            ))}

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
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
