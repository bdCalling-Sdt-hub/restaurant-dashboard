import { useSelector } from "react-redux";
import SelectionWarningCard from "../card/SelectionWarningCard";
import AssignTableList from "./AssignTableList";

const AssignTableSchedule = () => {
  const { selectedDate, scheduleId, diningId } = useSelector(
    (state) => state.table
  );

  return (
    <>
      {selectedDate && scheduleId && diningId ? (
        <AssignTableList />
      ) : (
        <>
          <SelectionWarningCard />
        </>
      )}
    </>
  );
};

export default AssignTableSchedule;
