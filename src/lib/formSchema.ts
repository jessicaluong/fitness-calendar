import { z } from "zod";
import { Category } from "./types";

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  sets: z.coerce.number(),
  reps: z.coerce.number(),
  weight: z.coerce.number(),
  id: z.string(),
});

export const createFormSchema = (categories: Category[]) => {
  return z.object({
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
    category: z
      .string()
      .refine((val) => categories.some((category) => category.id === val), {
        message: "Invalid category",
      }),
    exercises: z.array(exerciseSchema),
  });
};

export type FormSchema = z.infer<ReturnType<typeof createFormSchema>>;
