import { useGetScheduleDropDownQuery } from "../../redux/features/schedule/scheduleApi";
import { useGetDiningDropDownQuery } from "../../redux/features/dining/diningApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSingleBookingQuery } from "../../redux/features/booking/bookingApi";
import BookingLoading from "../../components/Loader/BookingLoading";
import AssignTable from "../../components/assignTable/AssignTable";
import { useEffect } from "react";
import { SetBooking } from "../../redux/features/booking/bookingSlice";
import { SetDiningId, SetDiningName, SetScheduleId, SetSelectedDate, SetSelectedTable, SetSelectedTableName, SetTime } from "../../redux/features/table/tableSlice";
import makeScheduleOptions from "../../utils/makeScheduleOptions";

const AssignTablePage = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const { selectedDate } = useSelector((state)=> state.table);
  const {data, isLoading : bookingLoading } = useGetSingleBookingQuery(bookingId);

  useEffect(() => {
    if (data?.data) {
      dispatch(SetBooking(data.data));
      const date = data?.data?.date;
      const Time = data?.data?.time;
      dispatch(SetSelectedDate(date));
      dispatch(SetTime(Time));
      dispatch(SetScheduleId(data?.data?.scheduleId));
      dispatch(SetDiningId(data?.data?.diningId));
      dispatch(SetDiningName(data?.data?.diningName));


      if(selectedDate !== date){
         dispatch(SetScheduleId(""));
         dispatch(SetDiningId(""));
         dispatch(SetSelectedTable(""));
         dispatch(SetSelectedTableName(""));
      } 
    }
  }, [data, dispatch, selectedDate]);


  //set scheduleOptions part-- started
  const { data: scheduleData, isLoading: scheduleLoading } =
    useGetScheduleDropDownQuery([{ name: "date", value: selectedDate }], {
      skip: !selectedDate,
    });

  useEffect(() => {
    if (scheduleData?.data) {
      makeScheduleOptions(scheduleData?.data);
    }
  }, [scheduleData, dispatch]);
  //set scheduleOptions part-- ended



  const { isLoading: diningLoading } = useGetDiningDropDownQuery();
 
 if(bookingLoading || scheduleLoading || diningLoading){
   return <BookingLoading/>
 }

 if(!bookingLoading && !scheduleLoading && !diningLoading){
   return <AssignTable/>
 }
  

};

export default AssignTablePage;
