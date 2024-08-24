import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityCard from "./ActivityCard";
import { getColorClasses } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Activity, CategoryData, Color } from "@/lib/types";

type CategoryCardProps = {
  categoryData: CategoryData;
  color: Color;
  activities: Activity[];
  handleEditActivity: (activityToEdit: Activity, categoryId: string) => void;
};

export default function CategoryCard({
  categoryData,
  color,
  activities,
  handleEditActivity,
}: CategoryCardProps) {
  const { theme } = useTheme();
  return (
    <Card background={getColorClasses(color, "category", theme)}>
      <CardHeader>
        <CardTitle bold>{categoryData.category}</CardTitle>
      </CardHeader>
      <CardContent>
        {activities &&
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              color={color}
              theme={theme}
              categoryData={categoryData}
              handleEditActivity={handleEditActivity}
            />
          ))}
      </CardContent>
    </Card>
  );
}
