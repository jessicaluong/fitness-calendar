import { useState, createContext } from "react";
import { CalendarData, Activity, Category, CalendarEntry } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

type DefaultContextType = {
  categories: Category[];
  getCategoryColor: (categoryId: string) => string;
  getCategoryName: (categoryId: string) => string;
  selectedDate: string;
  handleClickDate: (date: string) => void;
  calendarData: CalendarData;
  handleAddActivity: (newActivity: Activity, newCategoryId: string) => void;
  handleEditActivity: (
    activityToEdit: Activity,
    oldCalendarEntry: CalendarEntry,
    newCategoryId: string
  ) => void;
  handleRemoveActivity: (
    activityId: string,
    oldCalendarEntry: CalendarEntry
  ) => void;
};

type CalendarDataContextProviderProps = {
  children: React.ReactNode;
};

export const CalendarDataContext = createContext<DefaultContextType | null>(
  null
);

export default function CalendarDataContextProvider({
  children,
}: CalendarDataContextProviderProps) {
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

  const [categories, setCategories] = useState<Category[]>([
    { id: uuidv4(), name: "Cardio", color: "blue" },
    { id: uuidv4(), name: "Yoga", color: "pink" },
    { id: uuidv4(), name: "Gym", color: "yellow" },
    { id: uuidv4(), name: "Hiking", color: "green" },
  ]);

  const [calendarData, setCalendarData] = useState<CalendarData>({
    "2024-08-21": [
      {
        categoryId: categories[0].id,
        activities: [
          { id: uuidv4(), minutes: 30, name: "walking workout" },
          { id: uuidv4(), minutes: 15, name: "low impact aerobics" },
        ],
      },
      {
        categoryId: categories[1].id,
        activities: [{ id: uuidv4(), minutes: 45, name: "hatha" }],
      },
      {
        categoryId: categories[3].id,
        activities: [{ id: uuidv4(), minutes: 60, name: "grouse grind" }],
      },
      {
        categoryId: categories[2].id,
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
        categoryId: categories[0].id,
        activities: [
          { id: uuidv4(), minutes: 30, name: "walking workout" },
          { id: uuidv4(), minutes: 15, name: "low impact aerobics" },
        ],
      },
    ],
    "2024-08-23": [
      {
        categoryId: categories[3].id,
        activities: [
          { id: uuidv4(), minutes: 60, name: "grouse grind" },
          { id: uuidv4(), minutes: 60, name: "grouse grind" },
        ],
      },
    ],

    "2024-09-01": [
      {
        categoryId: categories[2].id,
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
        categoryId: categories[3].id,
        activities: [{ id: uuidv4(), minutes: 60, name: "grouse grind" }],
      },
    ],
  });

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.color : "gray";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "";
  };

  const addActivity = (
    prevData: CalendarData,
    newActivity: Activity,
    newCategoryId: string
  ) => {
    const updatedData = { ...prevData };

    // Check if date exists
    if (!updatedData[selectedDate]) {
      updatedData[selectedDate] = [];
    }

    const newCategoryIndex = updatedData[selectedDate].findIndex(
      (item) => item.categoryId === newCategoryId
    );

    if (newCategoryIndex !== -1) {
      // Category exists, add new activity to existing category
      updatedData[selectedDate][newCategoryIndex].activities.push(newActivity);
    } else {
      // Category doesn't exist, create new category and add activity to it
      const newCategoryData: CalendarEntry = {
        categoryId: newCategoryId,
        activities: [newActivity],
      };
      updatedData[selectedDate].push(newCategoryData);
    }
    return updatedData;
  };

  const handleAddActivity = (newActivity: Activity, newCategoryId: string) => {
    setCalendarData((prevData) =>
      addActivity(prevData, newActivity, newCategoryId)
    );
  };

  const removeActivity = (
    prevData: CalendarData,
    activityId: string,
    oldCalendarEntry: CalendarEntry
  ) => {
    const updatedData = { ...prevData };

    oldCalendarEntry.activities = oldCalendarEntry.activities.filter(
      (activity) => activity.id !== activityId
    );
    // If no more activities in that category, then delete it
    if (oldCalendarEntry.activities.length <= 0) {
      updatedData[selectedDate] = updatedData[selectedDate].filter(
        (category) => category.categoryId !== oldCalendarEntry.categoryId
      );
    }
    return updatedData;
  };

  const handleRemoveActivity = (
    activityId: string,
    oldCalendarEntry: CalendarEntry
  ) => {
    setCalendarData((prevData) =>
      removeActivity(prevData, activityId, oldCalendarEntry)
    );
  };

  const handleEditActivity = (
    activityToEdit: Activity,
    oldCalendarEntry: CalendarEntry,
    newCategoryId: string
  ) => {
    setCalendarData((prevData) => {
      let updatedData = { ...prevData };

      if (oldCalendarEntry.categoryId === newCategoryId) {
        // Category not changed, update activity in old category
        const activityIndex = oldCalendarEntry.activities.findIndex(
          (activity) => activity.id === activityToEdit.id
        );
        oldCalendarEntry.activities[activityIndex] = activityToEdit;
      } else {
        // Category changed, remove activity from old category and add it to new category
        updatedData = removeActivity(
          updatedData,
          activityToEdit.id,
          oldCalendarEntry
        );
        updatedData = addActivity(updatedData, activityToEdit, newCategoryId);
      }

      return updatedData;
    });
  };

  return (
    <CalendarDataContext.Provider
      value={{
        categories,
        getCategoryColor,
        getCategoryName,
        selectedDate,
        handleClickDate,
        calendarData,
        handleAddActivity,
        handleRemoveActivity,
        handleEditActivity,
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
}
