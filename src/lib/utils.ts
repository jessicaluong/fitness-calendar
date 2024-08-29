import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Theme, Variant } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorClasses(
  color: string,
  variant: Variant,
  theme: Theme
): string {
  const lightShades = {
    calendar: 400,
    category: 300,
    activity: 200,
    exercise: 100,
  };
  const darkShades = {
    calendar: 600,
    category: 800,
    activity: 700,
    exercise: 600,
  };

  let shades =
    theme === "dark"
      ? `bg-${color}-${darkShades[variant]}`
      : `bg-${color}-${lightShades[variant]}`;

  return shades;
}
