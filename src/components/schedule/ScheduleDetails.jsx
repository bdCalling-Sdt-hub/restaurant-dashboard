import { useParams } from "react-router-dom";
import TimeSlotLoading from "../Loader/TimeSlotLoading";
import SlotNotFoundCard from "../card/ScheduleNotFoundCard";
import ScheduleCard from "./ScheduleCard";
import { useGetSchedulesByDateQuery } from "../../redux/features/schedule/scheduleApi";

const ScheduleDetails = () => {
  const { date } = useParams();
  const { data, isLoading } = useGetSchedulesByDateQuery(date, {
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
            <ScheduleCard key={index} schedule={schedule} />
          ))}
        </div>
      </>
    );
  }

  if (!isLoading && schedules?.length === 0) {
    return <SlotNotFoundCard date={date} />;
  }
};

export default ScheduleDetails;
