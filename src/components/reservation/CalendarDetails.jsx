import CalendarScheduleCard from "./CalendarScheduleCard";
import { useGetReservationsByDateQuery } from "../../redux/features/reservation/reservationApi";
import { useParams } from "react-router-dom";
import TimeSlotLoading from "../Loader/TimeSlotLoading";
import SlotNotFoundCard from "../card/ScheduleNotFoundCard";

const CalendarDetails = () => {
  const { date } = useParams();
  const { data, isLoading } = useGetReservationsByDateQuery(date, {
    skip: !date,
  });
  // console.log(data?.data);
  const schedules = data?.data;

  if (isLoading) {
    return <TimeSlotLoading />;
  }

  if (!isLoading && schedules?.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules?.map((schedule, index) => (
            <CalendarScheduleCard key={index} schedule={schedule} />
          ))}
        </div>
      </>
    );
  }

  if (!isLoading && schedules?.length === 0) {
    return <SlotNotFoundCard date={date} />;
  }
};

export default CalendarDetails;
