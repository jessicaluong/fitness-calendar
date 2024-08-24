import CategoryCard from "./CategoryCard";
import Calendar from "./Calendar";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import {
  CalendarData,
  CategoryColors,
  CategoryData,
  Activity,
} from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

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
    "2024-08-21": [
      {
        id: uuidv4(),
        category: "cardio",
        activities: [
          { id: uuidv4(), minutes: 30, name: "walking workout" },
          { id: uuidv4(), minutes: 15, name: "low impact aerobics" },
        ],
      },
      {
        id: uuidv4(),
        category: "yoga",
        activities: [{ id: uuidv4(), minutes: 45, name: "hatha" }],
      },
      {
        id: uuidv4(),
        category: "hiking",
        activities: [{ id: uuidv4(), minutes: 60, name: "grouse grind" }],
      },
      {
        id: uuidv4(),
        category: "gym",
        activities: [
          {
            id: uuidv4(),
            minutes: 60,
            name: "upper body",
            exercises: [
              {
                id: uuidv4(),
                sets: 3,
                reps: 10,
                name: "back rows",
                weight: 10,
              },
              {
                id: uuidv4(),
                sets: 3,
                reps: 12,
                name: "lat pull down",
                weight: 15,
              },
              {
                id: uuidv4(),
                sets: 4,
                reps: 10,
                name: "tricep extensions",
                weight: 8,
              },
              {
                id: uuidv4(),
                sets: 3,
                reps: 12,
                name: "lateral raises",
                weight: 5,
              },
            ],
          },
        ],
      },
    ],
    "2024-08-22": [
      {
        id: uuidv4(),
        category: "cardio",
        activities: [
          { id: uuidv4(), minutes: 30, name: "walking workout" },
          { id: uuidv4(), minutes: 15, name: "low impact aerobics" },
        ],
      },
    ],
    "2024-08-23": [
      {
        id: uuidv4(),
        category: "hiking",
        activities: [
          { id: uuidv4(), minutes: 60, name: "grouse grind" },
          { id: uuidv4(), minutes: 60, name: "grouse grind" },
        ],
      },
    ],

    "2024-09-01": [
      {
        id: uuidv4(),
        category: "gym",
        activities: [
          {
            id: uuidv4(),
            minutes: 60,
            name: "upper body",
            exercises: [
              {
                id: uuidv4(),
                sets: 3,
                reps: 10,
                name: "back rows",
                weight: 10,
              },
              {
                id: uuidv4(),
                sets: 3,
                reps: 12,
                name: "lat pull down",
                weight: 15,
              },
              {
                id: uuidv4(),
                sets: 4,
                reps: 10,
                name: "tricep extensions",
                weight: 8,
              },
              {
                id: uuidv4(),
                sets: 3,
                reps: 12,
                name: "lateral raises",
                weight: 5,
              },
            ],
          },
        ],
      },
    ],

    "2024-09-23": [
      {
        id: uuidv4(),
        category: "hiking",
        activities: [{ id: uuidv4(), minutes: 60, name: "grouse grind" }],
      },
    ],
  });

  const handleAddActivity = (newActivity: CategoryData) => {
    setCalendarData((prevData) => {
      const updatedData = { ...prevData };

      // Check if date exists
      if (!updatedData[selectedDate]) {
        updatedData[selectedDate] = [];
      }

      const existingCategoryIndex = updatedData[selectedDate].findIndex(
        (item) => item.category === newActivity.category
      );

      if (existingCategoryIndex !== -1) {
        // Add new activity to existing category
        updatedData[selectedDate][existingCategoryIndex].activities.push(
          ...newActivity.activities
        );
      } else {
        // Add new activity to new category
        updatedData[selectedDate].push(newActivity);
      }

      return updatedData;
    });
  };

  const handleEditActivity = (activityToEdit: Activity, categoryId: string) => {
    setCalendarData((prevData) => {
      const updatedData = { ...prevData };

      const categoryIndex = updatedData[selectedDate].findIndex(
        (category) => category.id === categoryId
      );

      // TODO: handle editing category
      // TODO: handle removing activity
      if (categoryIndex !== -1) {
        const activityIndex = updatedData[selectedDate][
          categoryIndex
        ].activities.findIndex((activity) => activity.id === activityToEdit.id);

        if (activityIndex !== -1) {
          updatedData[selectedDate][categoryIndex].activities[activityIndex] =
            activityToEdit;
        }
      }
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
                {calendarData[selectedDate]?.map((event) => (
                  <CategoryCard
                    key={event.id}
                    categoryData={event}
                    color={categoryColors[event.category]}
                    activities={event.activities}
                    handleEditActivity={handleEditActivity}
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
