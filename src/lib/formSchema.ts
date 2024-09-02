import { z } from "zod";
import { Category } from "./types";

const number = z.coerce
  .number({
    message: "Must be a number",
  })
  .min(1, {
    message: "Must greater than 0",
  });

const exerciseSchema = z.object({
  name: z.string().min(1, "Required"),
  sets: number,
  reps: number,
  weight: number,
  id: z.string(),
});

export const createFormSchema = (categories: Category[]) => {
  return z.object({
    activity: z.string().min(1, {
      message: "Required",
    }),
    minutes: number,
    category: z
      .string()
      .refine((val) => categories.some((category) => category.id === val), {
        message: "Invalid category",
      }),
    exercises: z.array(exerciseSchema),
  });
};

export type FormSchema = z.infer<ReturnType<typeof createFormSchema>>;
