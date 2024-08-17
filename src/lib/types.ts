export const CATEGORIES = ["cardio", "yoga", "gym", "hiking"] as const;
export type Category = (typeof CATEGORIES)[number];
export type CategoryColors = {
  [key in Category]: Color;
};
export type Color = "pink" | "blue" | "yellow" | "green"; // TODO: Add more colors
export type Theme = "dark" | "light" | "system";
export type Variant = "calendar" | "category" | "activity" | "exercise";

export type Exercise = {
  sets: number;
  reps: number;
  name: string;
};

export type Activity = {
  minutes: number;
  name: string;
  exercises?: Exercise[];
};

export type CategoryData = {
  category: Category;
  activities: Activity[];
};

export type CalendarData = {
  [date: string]: CategoryData[];
};
