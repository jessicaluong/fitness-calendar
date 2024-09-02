import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import EditCategoriesDialog from "./EditCategoriesDialog";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="me-auto">
        <Button
          variant="secondary"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          Edit Categories
        </Button>
      </div>
      <ModeToggle />
      <EditCategoriesDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
