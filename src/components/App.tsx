import CategoryCard from "./CategoryCard";
import Calendar from "./Calendar";
import Header from "./Header";
import { useCalendarDataContext } from "@/lib/hooks";

function App() {
  const { calendarData, selectedDate, getCategoryColor } =
    useCalendarDataContext();

  return (
    <main className="flex justify-center w-full p-[5px] md:p-[10px]">
      <div className="grid grid-cols-1 gap-0.5 md:gap-1 justify-items-center  max-w-[720px]">
        <div className="w-full">
          <Header />
          <div className="mx-auto">
            <Calendar />
          </div>
        </div>
        <div className="pt-[10px] w-full">
          {calendarData[selectedDate] &&
          calendarData[selectedDate].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center ">
              {calendarData[selectedDate]?.map((event) => (
                <CategoryCard
                  key={event.categoryId}
                  calendarEntry={event}
                  color={getCategoryColor(event.categoryId)}
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
  );
}

export default App;
