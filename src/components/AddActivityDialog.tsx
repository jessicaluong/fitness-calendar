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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Activity } from "@/lib/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ActivityFormFields from "./ActivityFormFields";
import ExerciseFormFields from "./ExerciseFormFields";
import { useCalendarDataContext } from "@/lib/hooks";
import { createFormSchema } from "@/lib/formSchema";

export function AddActivityDialog() {
  const { handleAddActivity, categories } = useCalendarDataContext();
  const formSchema = createFormSchema(categories);

  const defaultValues = {
    activity: "",
    minutes: 0,
    category: undefined,
    exercises: [],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    form.reset(defaultValues);
  }, [open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newActivity: Activity = {
      id: uuidv4(),
      minutes: values.minutes,
      name: values.activity,
    };

    if (values.exercises && values.exercises.length > 0) {
      newActivity.exercises = values.exercises;
    }

    handleAddActivity(newActivity, values.category);
    setOpen(false);
    form.reset(defaultValues);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Activity</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-2"
          >
            <ActivityFormFields form={form} />
            {fields.map((field, index) => (
              <div
                key={`${field.id}`}
                className="grid grid-cols-1 border-t-[2px] gap-2 pt-4"
              >
                <ExerciseFormFields form={form} index={index} />
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Exercise
                </Button>
              </div>
            ))}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                type="button"
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
