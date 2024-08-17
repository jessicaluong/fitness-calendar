import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { AddActivityDialog } from "./AddActivityDialog";
import EditActivityDialog from "./EditActivityDialog";
import { CategoryData } from "@/lib/types";

type HeaderProps = {
  handleAddActivity: (newActivity: CategoryData) => void;
};

export default function Header({ handleAddActivity }: HeaderProps) {
  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="space-x-2 me-auto">
        <AddActivityDialog handleAddActivity={handleAddActivity} />
        <EditActivityDialog />
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
