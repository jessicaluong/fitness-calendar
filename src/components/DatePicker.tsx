import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type DatePickerProps = {
  label: string;
  handleCopy: (date: string) => void;
};

export function DatePicker({ label, handleCopy }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleSetDate = (date?: Date) => {
    if (date) {
      setDate(date);

      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      handleCopy(dateString);

      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>{label}</span>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        onFocusOutside={(e) => e.preventDefault()}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSetDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
