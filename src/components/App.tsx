import CategoryCard from "./CategoryCard";
import Calendar from "./Calendar";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@/contexts/theme-provider";
import {
  CalendarData,
  CategoryColors,
  CategoryData,
  Activity,
  Category,
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

  const addActivity = (
    prevData: CalendarData,
    newActivity: Activity,
    newCategoryName: Category
  ) => {
    const updatedData = { ...prevData };

    // Check if date exists
    if (!updatedData[selectedDate]) {
      updatedData[selectedDate] = [];
    }

    const newCategoryIndex = updatedData[selectedDate].findIndex(
      (item) => item.category === newCategoryName
    );

    if (newCategoryIndex !== -1) {
      console.log("category exists");
      // Category exists, add new activity to existing category
      updatedData[selectedDate][newCategoryIndex].activities.push(newActivity);
    } else {
      console.log("category does not exists");
      // Category doesn't exist, create new category and add activity to it
      const newCategoryData: CategoryData = {
        id: uuidv4(),
        category: newCategoryName,
        activities: [newActivity],
      };
      updatedData[selectedDate].push(newCategoryData);
    }
    return updatedData;
  };

  const handleAddActivity = (
    newActivity: Activity,
    newCategoryName: Category
  ) => {
    setCalendarData((prevData) =>
      addActivity(prevData, newActivity, newCategoryName)
    );
  };

  const removeActivity = (
    prevData: CalendarData,
    activityId: string,
    oldCategoryData: CategoryData
  ) => {
    const updatedData = { ...prevData };

    oldCategoryData.activities = oldCategoryData.activities.filter(
      (activity) => activity.id !== activityId
    );
    // If no more activities in that category, then delete it
    if (oldCategoryData.activities.length <= 0) {
      updatedData[selectedDate] = updatedData[selectedDate].filter(
        (category) => category.id !== oldCategoryData.id
      );
    }
    return updatedData;
  };

  const handleRemoveActivity = (
    activityId: string,
    oldCategoryData: CategoryData
  ) => {
    setCalendarData((prevData) =>
      removeActivity(prevData, activityId, oldCategoryData)
    );
  };

  const handleEditActivity = (
    activityToEdit: Activity,
    oldCategoryId: string,
    newCategoryName: Category
  ) => {
    setCalendarData((prevData) => {
      let updatedData = { ...prevData };

      const oldCategoryIndex = updatedData[selectedDate].findIndex(
        (category) => category.id === oldCategoryId
      );
      const oldCategoryData = updatedData[selectedDate][oldCategoryIndex];
      const oldCategoryName = oldCategoryData.category;

      console.log(oldCategoryName);
      console.log(newCategoryName);

      if (oldCategoryName === newCategoryName) {
        // Category not changed, update activity in old category
        const activityIndex = oldCategoryData.activities.findIndex(
          (activity) => activity.id === activityToEdit.id
        );
        oldCategoryData.activities[activityIndex] = activityToEdit;
      } else {
        // Category changed, remove activity from old category and add it to new category
        updatedData = removeActivity(
          updatedData,
          activityToEdit.id,
          oldCategoryData
        );
        updatedData = addActivity(updatedData, activityToEdit, newCategoryName);
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
                    handleRemoveActivity={handleRemoveActivity}
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
