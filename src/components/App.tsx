import CategoryCard from "./CategoryCard";
import Calendar from "./Calendar";
import Header from "./Header";
import { useCalendarDataContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { AddActivityDialog } from "./AddActivityDialog";
import ActivityActions from "./ActivityActions";

function App() {
  const { calendarData, selectedDate, getCategoryColor } =
    useCalendarDataContext();

  return (
    <main className="flex justify-center w-full p-[5px] md:p-[10px]">
      <div className="grid grid-cols-1 max-w-[720px]">
        <div className="justify-items-center">
          <div className="w-full">
            <Header />
            <div className="mx-auto">
              <Calendar />
            </div>
          </div>
          <ActivityActions />
          <div className="pt-[5px] md:pt-[10px] w-full">
            {calendarData[selectedDate] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                {calendarData[selectedDate]?.map((event) => (
                  <CategoryCard
                    key={event.categoryId}
                    calendarEntry={event}
                    color={getCategoryColor(event.categoryId)}
                    activities={event.activities}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
