export const CATEGORIES = ["cardio", "yoga", "gym", "hiking"] as const;
export type Category = (typeof CATEGORIES)[number];
export type CategoryColors = {
  [key in Category]: Color;
};
export type Color = "pink" | "blue" | "yellow" | "green"; // TODO: Add more colors
export type Theme = "dark" | "light" | "system";
export type Variant = "calendar" | "category" | "activity" | "exercise";

export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Activity = {
  name: string;
  minutes: number;
  exercises?: Exercise[];
};

export type CategoryData = {
  category: Category;
  activities: Activity[];
};

export type CalendarData = {
  [date: string]: CategoryData[];
};
