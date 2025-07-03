import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ExerciseCard from "./ExerciseCard";
import { getColorClasses } from "@/lib/utils";
import { Theme, Activity, CalendarEntry } from "@/lib/types";
import EditActivityDialog from "./EditActivityDialog";
import { useState } from "react";

type ActivityCardProps = {
  activity: Activity;
  color: string;
  theme: Theme;
  calendarEntry: CalendarEntry;
};

export default function ActivityCard({
  activity,
  color,
  theme,
  calendarEntry,
}: ActivityCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="pb-1">
      <Card
        background={getColorClasses(color, "activity", theme)}
        onClick={() => {
          setIsDialogOpen(true);
        }}
        className="cursor-pointer"
      >
        <CardHeader>
          <CardTitle>
            {activity.minutes} minutes {activity.name}
          </CardTitle>
        </CardHeader>
        {activity.exercises && (
          <ExerciseCard
            exercises={activity.exercises}
            color={color}
            theme={theme}
          />
        )}
      </Card>
      <EditActivityDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        activity={activity}
        calendarEntry={calendarEntry}
      />
    </div>
  );
}
