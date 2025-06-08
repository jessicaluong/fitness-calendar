import { CalendarDataContext } from "@/contexts/CalendarDataContextProvider";
import { useContext } from "react";

export function useCalendarDataContext() {
  const context = useContext(CalendarDataContext);
  if (!context) {
    throw new Error("Must add provider");
  }
  return context;
}
