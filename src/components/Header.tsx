import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="space-x-2 me-auto">
        <Button>Add</Button>
        <Button>Edit</Button>
      </div>
      <div className="space-x-2 flex items-center">
        <ModeToggle />
        <Button variant="outline" size="icon">
          J
        </Button>
      </div>
    </section>
  );
}
