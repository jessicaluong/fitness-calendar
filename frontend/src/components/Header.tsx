import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import EditCategoriesDialog from "./EditCategoriesDialog";
import { LayoutGrid } from "lucide-react";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="flex pb-[5px] md:pb-[10px]">
      <div className="ms-auto">
        <ModeToggle />
        <Button
          variant="ghost"
          size="rounded"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <LayoutGrid className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <EditCategoriesDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
