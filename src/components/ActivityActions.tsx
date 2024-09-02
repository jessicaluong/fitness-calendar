import { AddActivityDialog } from "./AddActivityDialog";
import { CustomDropdownMenu } from "./CustomDropdownMenu";

export default function ActivityActions() {
  return (
    <section className="flex pt-[10px]">
      <div className="me-auto">
        <AddActivityDialog />
      </div>
      <CustomDropdownMenu />
    </section>
  );
}
