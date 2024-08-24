import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { AddActivityDialog } from "./AddActivityDialog";
import { Activity, Category } from "@/lib/types";

type HeaderProps = {
  handleAddActivity: (newActivity: Activity, newCategoryName: Category) => void;
};

export default function Header({ handleAddActivity }: HeaderProps) {
  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="space-x-2 me-auto">
        <AddActivityDialog handleAddActivity={handleAddActivity} />
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
