import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "./DatePicker";
import { useCalendarDataContext } from "@/lib/hooks";
import { useState } from "react";

export function CustomDropdownMenu() {
  const [open, setOpen] = useState(false);

  const { handleCopyToDate, handleCopyFromDate } = useCalendarDataContext();

  const handleCopy =
    (copyFunction: (date: string) => void) => (date: string) => {
      copyFunction(date);
      setOpen(false);
    };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-46">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DatePicker
              label="Copy To Date"
              handleCopy={handleCopy(handleCopyToDate)}
            />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DatePicker
              label="Copy From Date"
              handleCopy={handleCopy(handleCopyFromDate)}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
