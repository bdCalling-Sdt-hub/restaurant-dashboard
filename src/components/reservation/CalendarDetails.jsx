import { useState } from "react";
import CalendarScheduleCard from "./CalendarScheduleCard";

const CalendarDetails = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, time: "10:00 AM - 11:00 AM", seats: 10 },
    { id: 2, time: "12:00 PM - 01:00 PM", seats: 15 },
    { id: 3, time: "02:00 PM - 03:00 PM", seats: 8 },
    { id: 4, time: "04:00 PM - 05:00 PM", seats: 12 },
    { id: 5, time: "06:00 PM - 07:00 PM", seats: 5 },
  ]);


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules?.map((schedule, index) => (
          <CalendarScheduleCard key={index} schedule={schedule}/>
        ))}
      </div>
    </>
  );
};

export default CalendarDetails;
