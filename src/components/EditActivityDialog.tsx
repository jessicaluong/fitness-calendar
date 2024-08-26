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
import { CategoryData, Activity, formSchema } from "@/lib/types";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ActivityFormFields from "./ActivityFormFields";
import ExerciseFormFields from "./ExerciseFormFields";
import { useCalendarDataContext } from "@/lib/hooks";

type EditActivityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity;
  categoryData: CategoryData;
};

export default function EditActivityDialog({
  open,
  onOpenChange,
  activity,
  categoryData,
}: EditActivityDialogProps) {
  const { handleEditActivity, handleRemoveActivity } = useCalendarDataContext();

  const defaultValues = {
    activity: activity?.name || "",
    minutes: activity?.minutes || 30,
    category: categoryData?.category || undefined,
    exercises: activity?.exercises || [],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const activityToEdit: Activity = {
      id: activity.id,
      minutes: values.minutes,
      name: values.activity,
    };

    if (values.exercises && values.exercises.length > 0) {
      activityToEdit.exercises = values.exercises;
    }

    handleEditActivity(activityToEdit, categoryData.id, values.category);
    onOpenChange(false);
    form.reset(defaultValues);
  }

  const removeActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleRemoveActivity(activity.id, categoryData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-2"
          >
            <ActivityFormFields form={form} />
            <Button variant="secondary" onClick={removeActivity}>
              Remove Activity
            </Button>
            {fields.map((field, index) => (
              <div
                key={`${field.id}`}
                className="grid grid-cols-1 border-t-[2px] gap-2 pt-4"
              >
                <ExerciseFormFields form={form} index={index} />
                <Button variant="secondary" onClick={() => remove(index)}>
                  Remove Exercise
                </Button>
              </div>
            ))}
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 border-t-[2px] pt-4 sm:border-0 sm:pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  append({
                    name: "",
                    sets: 0,
                    reps: 0,
                    weight: 0,
                    id: uuidv4(),
                  });
                }}
              >
                Add Exercise
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
