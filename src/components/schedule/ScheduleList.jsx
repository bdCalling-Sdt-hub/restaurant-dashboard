import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import ScheduleTable from "./ScheduleTable";
import CreateScheduleModal from "../modal/schedule/CreateScheduleModal";
import { useGetSchedulesQuery } from "../../redux/features/schedule/scheduleApi";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { SetScheduleSelectedDate } from "../../redux/features/schedule/scheduleSlice";

const ScheduleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { scheduleSelectedDate } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetSchedulesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "date", value: scheduleSelectedDate },
  ]);
  const schedules = data?.data || [];
  const meta = data?.meta;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <CreateScheduleModal />
        {/* Filter By Date */}
        <div className="mr-20 px-6 flex gap-x-2">
          <span className="text-xl font-semibold">Filter:</span>
          <DatePicker
            value={scheduleSelectedDate ? dayjs(scheduleSelectedDate) : null}
            onChange={(_, dateString) => {
              dispatch(SetScheduleSelectedDate(dateString));
            }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      {isLoading ? (
        <ListLoading />
      ) : (
        <ScheduleTable
          schedules={schedules}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default ScheduleList;
