export type Theme = "dark" | "light" | "system";
export type Variant = "calendar" | "category" | "activity" | "exercise";

export const COLORS = ["pink", "blue", "yellow", "green", "purple"];
export type Color = (typeof COLORS)[number];

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

export type Category = {
  id: string;
  name: string;
  color: Color;
};

export type CalendarEntry = {
  categoryId: string;
  activities: Activity[];
};

export type CalendarData = {
  [date: string]: CalendarEntry[];
};
