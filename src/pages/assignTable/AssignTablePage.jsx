import { useGetScheduleDropDownQuery } from "../../redux/features/schedule/scheduleApi";
import { useGetDiningDropDownQuery } from "../../redux/features/dining/diningApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSingleBookingQuery } from "../../redux/features/booking/bookingApi";
import BookingLoading from "../../components/Loader/BookingLoading";
import AssignTable from "../../components/assignTable/AssignTable";

const AssignTablePage = () => {
  const { bookingId } = useParams();
  const { selectedDate } = useSelector((state)=> state.table);
  const { isLoading : bookingLoading } = useGetSingleBookingQuery(bookingId);

  const { isLoading : scheduleLoading } =  useGetScheduleDropDownQuery(
    [{ name: "date", value: selectedDate }],
    {
      skip: !selectedDate,
    }
  );

  const { isLoading: diningLoading } = useGetDiningDropDownQuery();
 
 if(bookingLoading || scheduleLoading || diningLoading){
   return <BookingLoading/>
 }

 if(!bookingLoading && !scheduleLoading && !diningLoading){
   return <AssignTable/>
 }
  

};

export default AssignTablePage;
