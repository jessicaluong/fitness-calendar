import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryData, CATEGORIES, Activity } from "@/lib/types";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  sets: z.coerce.number(),
  reps: z.coerce.number(),
  weight: z.coerce.number(),
  id: z.string(),
});

const formSchema = z.object({
  activity: z.string().min(1, {
    message: "Required",
  }),
  minutes: z.coerce
    .number({
      message: "Minutes must be a valid number.",
    })
    .min(1, {
      message: "Minutes must greater than 0.",
    }),
  category: z.enum(CATEGORIES),
  exercises: z.array(exerciseSchema),
});

type EditActivityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity;
  categoryData: CategoryData;
  handleEditActivity: (activityToEdit: Activity, categoryId: string) => void;
};

export default function EditActivityDialog({
  open,
  onOpenChange,
  activity,
  categoryData,
  handleEditActivity,
}: EditActivityDialogProps) {
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
    if (activity) {
      form.reset({
        activity: activity.name,
        minutes: activity.minutes,
        category: categoryData.category,
        exercises: activity.exercises || [],
      });
    }
  }, [activity, categoryData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const activityToEdit: Activity = {
      id: activity.id,
      minutes: values.minutes,
      name: values.activity,
    };

    if (values.exercises && values.exercises.length > 0) {
      activityToEdit.exercises = values.exercises;
    }

    console.log(values);
    console.log(activityToEdit);
    handleEditActivity(activityToEdit, categoryData.id);
    onOpenChange(false);
    form.reset(defaultValues);
  }

  const exerciseFields = [
    { name: "name", label: "Exercise name", placeholder: "Bench Press" },
    { name: "sets", label: "Sets", placeholder: "3" },
    { name: "reps", label: "Reps", placeholder: "10" },
    { name: "weight", label: "Weight (in lbs)", placeholder: "135" },
  ];

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
                    <FormLabel className="text-right">
                      Minutes Performed
                    </FormLabel>
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
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
                </FormItem>
              )}
            />
            <Button variant="secondary">Remove Activity</Button>
            {fields.map((field, index) => (
              <div
                key={`${field.id}`}
                className="grid grid-cols-1 border-t-[2px] gap-2 pt-4"
              >
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
                              type={
                                exerciseField.name === "name"
                                  ? "text"
                                  : "number"
                              }
                              placeholder={exerciseField.placeholder}
                              {...field}
                              onChange={(e) => {
                                const value =
                                  exerciseField.name === "name"
                                    ? e.target.value
                                    : e.target.valueAsNumber;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 ml-[27%] sm:ml-[35%]" />
                      </FormItem>
                    )}
                  />
                ))}
                <Button variant="secondary" onClick={() => remove(index)}>
                  Remove Exercise
                </Button>
              </div>
            ))}

            <DialogFooter className="gap-2 sm:gap-0">
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
