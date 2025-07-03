import { AddActivityDialog } from "./AddActivityDialog";
import { CustomDropdownMenu } from "./CustomDropdownMenu";

export default function ActivityActions() {
  return (
    <section className="flex me-auto gap-2">
      <AddActivityDialog />
      <CustomDropdownMenu />
    </section>
  );
}
