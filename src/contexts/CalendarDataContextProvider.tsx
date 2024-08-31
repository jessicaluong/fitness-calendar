import { useState, createContext, useEffect } from "react";
import { CalendarData, Activity, Category, CalendarEntry } from "@/lib/types";

type DefaultContextType = {
  categories: Category[];
  getCategoryColor: (categoryId: string) => string;
  getCategoryName: (categoryId: string) => string;
  handleSetCategories: (newCategories: Category[]) => void;
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

const getInitialCategories = () => {
  const savedCategories = localStorage.getItem("categories");
  if (savedCategories) {
    return JSON.parse(savedCategories);
  } else {
    return [
      { id: "category1-id", name: "Cardio", color: "blue" },
      { id: "category2-id", name: "Yoga", color: "pink" },
      { id: "category3-id", name: "Gym", color: "yellow" },
      { id: "category4-id", name: "Hiking", color: "green" },
    ];
  }
};

const getInitialCalendarData = () => {
  const savedCalendarData = localStorage.getItem("calendarData");
  if (savedCalendarData) {
    return JSON.parse(savedCalendarData);
  } else {
    return {};
  }
};

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

  const [categories, setCategories] =
    useState<Category[]>(getInitialCategories);

  const handleSetCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.color : "gray";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "";
  };

  const [calendarData, setCalendarData] = useState<CalendarData>(
    getInitialCalendarData
  );

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

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  return (
    <CalendarDataContext.Provider
      value={{
        categories,
        getCategoryColor,
        getCategoryName,
        handleSetCategories,
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
