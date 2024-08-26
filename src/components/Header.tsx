import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { AddActivityDialog } from "./AddActivityDialog";

export default function Header() {
  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="space-x-2 me-auto">
        <AddActivityDialog />
      </div>
      <div className="space-x-2 flex items-center">
        <ModeToggle />
        <Button variant="outline" size="rounded">
          J
        </Button>
      </div>
    </section>
  );
}
