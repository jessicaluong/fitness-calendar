import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ExerciseCard from "./ExerciseCard";
import { getColorClasses } from "@/lib/utils";
import { Color, Theme, Activity, CategoryData } from "@/lib/types";
import EditActivityDialog from "./EditActivityDialog";
import { useState } from "react";

type ActivityCardProps = {
  activity: Activity;
  color: Color;
  theme: Theme;
  categoryData: CategoryData;
};

export default function ActivityCard({
  activity,
  color,
  theme,
  categoryData,
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
        categoryData={categoryData}
      />
    </div>
  );
}
