import { useState } from "react";
import { AddActivityDialog } from "./AddActivityDialog";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import EditCategoriesDialog from "./EditCategoriesDialog";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="space-x-2 me-auto">
        <AddActivityDialog />
        <Button
          variant="secondary"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          Edit Categories
        </Button>
      </div>
      <div className="space-x-2 flex items-center">
        <ModeToggle />
      </div>
      <EditCategoriesDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
