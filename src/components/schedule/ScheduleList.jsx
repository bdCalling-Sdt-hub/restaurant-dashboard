
import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import ScheduleTable from "./ScheduleTable";
import CreateScheduleModal from "../modal/schedule/CreateScheduleModal";
import { useGetSchedulesQuery } from "../../redux/features/schedule/scheduleApi";


const ScheduleList = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);

  const { data, isLoading } = useGetSchedulesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize }
  ]);
  const schedules = data?.data || []
  const meta = data?.meta;

 
    

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <CreateScheduleModal/>
        <div className="mr-20 px-6">
          <span>
            Filter: 
          </span>
        </div>
      </div>
      {
        isLoading ? (
          <ListLoading/>
        ): (
          <ScheduleTable schedules={schedules} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
        )
      }
    </>
  );
}

export default ScheduleList;