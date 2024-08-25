import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ExerciseCard from "./ExerciseCard";
import { getColorClasses } from "@/lib/utils";
import { Color, Theme, Activity, CategoryData, Category } from "@/lib/types";
import EditActivityDialog from "./EditActivityDialog";
import { useState } from "react";

type ActivityCardProps = {
  activity: Activity;
  color: Color;
  theme: Theme;
  categoryData: CategoryData;
  handleEditActivity: (
    activityToEdit: Activity,
    oldCategoryId: string,
    newCategory: Category
  ) => void;
  handleRemoveActivity: (
    activityId: string,
    oldCategoryData: CategoryData
  ) => void;
};

export default function ActivityCard({
  activity,
  color,
  theme,
  categoryData,
  handleEditActivity,
  handleRemoveActivity,
}: ActivityCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="pb-1">
      <Card
        background={getColorClasses(color, "activity", theme)}
        onClick={() => {
          setIsDialogOpen(true);
        }}
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
        handleEditActivity={handleEditActivity}
        handleRemoveActivity={handleRemoveActivity}
      />
    </div>
  );
}
