import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryData, CATEGORIES } from "@/lib/types";

const formSchema = z.object({
  activity: z.string().min(1, {
    message: "Activity name is required.",
  }),
  minutes: z
    .string()
    .min(1, {
      message: "Minutes is required.",
    })
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Minutes must be a valid number.",
    })
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, {
      message: "Minutes must be at least 0.",
    }),
  category: z.enum(CATEGORIES),
});

type AddActivityDialogProps = {
  handleAddActivity: (newActivity: CategoryData) => void;
};

export function AddActivityDialog({
  handleAddActivity,
}: AddActivityDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: "",
      minutes: undefined,
      category: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newActivity: CategoryData = {
      category: values.category,
      activities: [{ minutes: values.minutes, name: values.activity }],
    };
    handleAddActivity(newActivity);
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
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
                  <div className="grid grid-cols-4 md:grid-cols-3 items-center gap-4">
                    <FormLabel className="text-right">Activity Name</FormLabel>
                    <FormControl className="col-span-3 md:col-span-2">
                      <Input placeholder="walking" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-1 ml-[25%] md:ml-[33%]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 md:grid-cols-3 items-center gap-4">
                    <FormLabel className="text-right">
                      Minutes Performed
                    </FormLabel>
                    <FormControl className="col-span-3 md:col-span-2">
                      <Input placeholder="30" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-1 ml-[25%] md:ml-[33%]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 md:grid-cols-3 items-center gap-4">
                    <FormLabel className="text-right">Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="col-span-3 md:col-span-2">
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
                  <FormMessage className="mt-1 ml-[25%] md:ml-[33%]" />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="submit">Add Exercise</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
