import ReactCalendar from "react-calendar";
import Square from "./Square";
import "./CustomCalendar.css";
import { getColorClasses } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-provider";
import { useCalendarDataContext } from "@/lib/hooks";

type TileContentProps = {
  date: Date;
};

export default function Calendar() {
  const { theme } = useTheme();
  const { calendarData, categoryColors, handleClickDate } =
    useCalendarDataContext();

  const tileContent = ({ date }: TileContentProps) => {
    const dateStr = date.toISOString().split("T")[0];
    const dayEvents = calendarData[dateStr] || [];
    return (
      <div className="flex flex-wrap gap-0.5 md:gap-1 justify-center">
        {dayEvents.map((event) => (
          <Square
            key={event.id}
            color={getColorClasses(
              categoryColors[event.category],
              "calendar",
              theme
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <ReactCalendar
      calendarType="gregory"
      minDetail="month"
      prev2Label={null}
      next2Label={null}
      tileContent={tileContent}
      onClickDay={(date) => handleClickDate(date.toISOString().split("T")[0])}
    />
  );
}
