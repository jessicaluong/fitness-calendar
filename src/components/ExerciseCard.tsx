import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getColorClasses } from "@/lib/utils";
import { Color, Exercise, Theme } from "@/lib/types";

type ExerciseCardProps = {
  exercises: Exercise[];
  color: Color;
  theme: Theme;
};

export default function ExerciseCard({
  exercises,
  color,
  theme,
}: ExerciseCardProps) {
  return (
    <CardContent>
      <Card background={getColorClasses(color, "exercise", theme)}>
        <CardHeader>
          <CardTitle left>
            {exercises.map((exercise) => (
              <p key={exercise.id}>
                {exercise.sets} x {exercise.reps} {exercise.name} (
                {exercise.weight} lbs)
              </p>
            ))}
          </CardTitle>
        </CardHeader>
      </Card>
    </CardContent>
  );
}
