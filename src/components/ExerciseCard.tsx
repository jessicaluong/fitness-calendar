import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getColorClasses } from "@/lib/utils";
import { Exercise, Theme } from "@/lib/types";

type ExerciseCardProps = {
  exercises: Exercise[];
  color: string;
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
                <span className="tracking-tight">
                  {exercise.sets} x {exercise.reps}{" "}
                </span>
                {exercise.name}
                <span className="text-[0.9rem] tracking-tight">
                  {" "}
                  ({exercise.weight} lbs)
                </span>
              </p>
            ))}
          </CardTitle>
        </CardHeader>
      </Card>
    </CardContent>
  );
}
