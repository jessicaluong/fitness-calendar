import { z } from "zod";

export const CATEGORIES = ["cardio", "yoga", "gym", "hiking"] as const;
export type Category = (typeof CATEGORIES)[number];
export type CategoryColors = {
  [key in Category]: Color;
};
export type Color = "pink" | "blue" | "yellow" | "green"; // TODO: Add more colors
export type Theme = "dark" | "light" | "system";
export type Variant = "calendar" | "category" | "activity" | "exercise";

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Activity = {
  id: string;
  name: string;
  minutes: number;
  exercises?: Exercise[];
};

export type CategoryData = {
  id: string;
  category: Category;
  activities: Activity[];
};

export type CalendarData = {
  [date: string]: CategoryData[];
};

export const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  sets: z.coerce.number(),
  reps: z.coerce.number(),
  weight: z.coerce.number(),
  id: z.string(),
});

export const formSchema = z.object({
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

export type FormSchema = z.infer<typeof formSchema>;
