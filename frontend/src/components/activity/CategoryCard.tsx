import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityCard from "./ActivityCard";
import { getColorClasses } from "@/lib/utils";
import { Activity, CalendarEntry } from "@/lib/types";
import { useTheme } from "@/contexts/theme-provider";
import { useCalendarDataContext } from "@/lib/hooks";

type CategoryCardProps = {
  calendarEntry: CalendarEntry;
  color: string;
  activities: Activity[];
};

export default function CategoryCard({
  calendarEntry,
  color,
  activities,
}: CategoryCardProps) {
  const { theme } = useTheme();
  const { getCategoryName } = useCalendarDataContext();

  return (
    <Card background={getColorClasses(color, "category", theme)}>
      <CardHeader>
        <CardTitle bold>{getCategoryName(calendarEntry.categoryId)}</CardTitle>
      </CardHeader>
      <CardContent>
        {activities &&
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              color={color}
              theme={theme}
              calendarEntry={calendarEntry}
            />
          ))}
      </CardContent>
    </Card>
  );
}
