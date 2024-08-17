import CategoryCard from "./CategoryCard";
import Calendar from "./Calendar";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CalendarData, CategoryColors } from "@/lib/types";
import { CategoryData } from "@/lib/types";

function App() {
  const categoryColors: CategoryColors = {
    cardio: "blue",
    yoga: "pink",
    gym: "yellow",
    hiking: "green",
  };

  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
  });

  const handleClickDate = (date: string) => {
    setSelectedDate(date);
  };

  const [calendarData, setCalendarData] = useState<CalendarData>({
    "2024-07-21": [
      {
        category: "cardio",
        activities: [
          { minutes: 30, name: "walking workout" },
          { minutes: 15, name: "low impact aerobics" },
        ],
      },
      {
        category: "yoga",
        activities: [{ minutes: 45, name: "hatha" }],
      },
      {
        category: "hiking",
        activities: [{ minutes: 60, name: "grouse grind" }],
      },
      {
        category: "gym",
        activities: [
          {
            minutes: 60,
            name: "upper body",
            exercises: [
              { sets: 3, reps: 10, name: "back rows (10 lb)" },
              { sets: 3, reps: 12, name: "lat pull down (15 lb)" },
              { sets: 4, reps: 10, name: "tricep extensions (8 lb)" },
              { sets: 3, reps: 12, name: "lateral raises (5 lb)" },
            ],
          },
        ],
      },
    ],
    "2024-07-22": [
      {
        category: "cardio",
        activities: [
          { minutes: 30, name: "walking workout" },
          { minutes: 15, name: "low impact aerobics" },
        ],
      },
    ],
    "2024-07-23": [
      {
        category: "hiking",
        activities: [
          { minutes: 60, name: "grouse grind" },
          { minutes: 60, name: "grouse grind" },
        ],
      },
    ],

    "2024-08-01": [
      {
        category: "gym",
        activities: [
          {
            minutes: 60,
            name: "upper body",
            exercises: [
              { sets: 3, reps: 10, name: "back rows" },
              { sets: 3, reps: 12, name: "lat pull down" },
              { sets: 4, reps: 10, name: "tricep extensions" },
              { sets: 3, reps: 10, name: "back rows" },
              { sets: 3, reps: 12, name: "lat pull down" },
            ],
          },
        ],
      },
    ],

    "2024-08-23": [
      {
        category: "hiking",
        activities: [{ minutes: 60, name: "grouse grind" }],
      },
    ],
  });

  const handleAddActivity = (newActivity: CategoryData) => {
    setCalendarData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData[selectedDate]) {
        updatedData[selectedDate] = [];
      }
      updatedData[selectedDate].push(newActivity);
      return updatedData;
    });
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="flex justify-center w-full p-[5px] md:p-[10px]">
        <div className="grid grid-cols-1 gap-0.5 md:gap-1 justify-items-center  max-w-[720px]">
          <div className="w-full">
            <Header handleAddActivity={handleAddActivity} />
            <div className="mx-auto">
              <Calendar
                calendarData={calendarData}
                categoryColors={categoryColors}
                handleClickDate={handleClickDate}
              />
            </div>
          </div>
          <div className="pt-[10px] w-full">
            {calendarData[selectedDate] &&
            calendarData[selectedDate].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center ">
                {calendarData[selectedDate]?.map((event, index) => (
                  <CategoryCard
                    key={index}
                    category={event.category}
                    color={categoryColors[event.category]}
                    activities={event.activities}
                  />
                ))}
              </div>
            ) : (
              <p className="font-semibold text-center">
                No events for this date.
              </p>
            )}
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
