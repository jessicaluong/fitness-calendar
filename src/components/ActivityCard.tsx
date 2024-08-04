import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ExerciseCard from "./ExerciseCard";
import { getColorClasses } from "@/lib/utils";
import { Color, Exercise, Theme } from "@/lib/types";

type Activity = {
  time: string;
  description: string;
  exercises?: Exercise[];
};

type ActivityCardProps = {
  activity: Activity;
  color: Color;
  theme: Theme;
};

export default function ActivityCard({
  activity,
  color,
  theme,
}: ActivityCardProps) {
  return (
    <div className="pb-1">
      <Card background={getColorClasses(color, "activity", theme)}>
        <CardHeader>
          <CardTitle>
            {activity.time} {activity.description}
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
    </div>
  );
}
