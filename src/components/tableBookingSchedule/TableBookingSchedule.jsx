import SelectionWarningCard from "../card/SelectionWarningCard";
import TableBookingScheduleList from "./TableBookingScheduleList";

const TableBookingSchedule = ({selectedDate, scheduleId, diningId}) => {
    
    return (
      <>
        {selectedDate && scheduleId && diningId ? (
          <TableBookingScheduleList
            scheduleId={scheduleId}
            diningId={diningId}
          />
        ) : (
          <>
           <SelectionWarningCard/>
          </>
        )}
      </>
    );
};

export default TableBookingSchedule;