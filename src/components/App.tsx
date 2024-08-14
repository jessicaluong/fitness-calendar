import CategoryCard from "./CategoryCard";
import Calendar from "./Calendar";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CalendarData, CategoryColors } from "@/lib/types";

function App() {
  const categoryColors: CategoryColors = {
    cardio: "blue",
    yoga: "pink",
    gym: "yellow",
    hiking: "green",
  };

  const calendarData: CalendarData = {
    "2024-07-21": [
      {
        category: "cardio",
        activities: [
          { time: "30 min", description: "walking workout" },
          { time: "15 min", description: "low impact aerobics" },
        ],
      },
      {
        category: "yoga",
        activities: [{ time: "45 min", description: "hatha" }],
      },
      {
        category: "hiking",
        activities: [{ time: "60 min", description: "grouse grind" }],
      },
      {
        category: "gym",
        activities: [
          {
            time: "60 min",
            description: "upper body",
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
          { time: "30 min", description: "walking workout" },
          { time: "15 min", description: "low impact aerobics" },
        ],
      },
    ],
    "2024-07-23": [
      {
        category: "hiking",
        activities: [
          { time: "60 min", description: "grouse grind" },
          { time: "60 min", description: "grouse grind" },
        ],
      },
    ],

    "2024-08-01": [
      {
        category: "gym",
        activities: [
          {
            time: "60 min",
            description: "upper body",
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
        activities: [{ time: "60 min", description: "grouse grind" }],
      },
    ],
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

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="flex justify-center w-full p-[5px] md:p-[10px]">
        <div className="grid grid-cols-1 gap-0.5 md:gap-1 justify-items-center  max-w-[720px]">
          <div className="w-full">
            <Header />
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
