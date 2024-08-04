import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityCard from "./ActivityCard";
import { getColorClasses } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Activity, Color } from "@/lib/types";

type CategoryCardProps = {
  category: string;
  color: Color;
  activities: Activity[];
};

export default function CategoryCard({
  category,
  color,
  activities,
}: CategoryCardProps) {
  const { theme } = useTheme();
  return (
    <Card background={getColorClasses(color, "category", theme)}>
      <CardHeader>
        <CardTitle bold>{category}</CardTitle>
      </CardHeader>
      <CardContent>
        {activities &&
          activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              color={color}
              theme={theme}
            />
          ))}
      </CardContent>
    </Card>
  );
}
