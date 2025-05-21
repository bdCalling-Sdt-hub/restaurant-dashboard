import RestaurantLoading from "../../components/Loader/RestaurantLoading";
import UpdateLocationForm from "../../components/Location/UpdateLocationForm";
import { useGetMyRestaurantQuery } from "../../redux/features/restaurant/restaurantApi";


const UpdateLocationPage = () => {
  const { data, isLoading, isSuccess, error} = useGetMyRestaurantQuery(undefined);
  const restaurantData = data?.data;

 if(isLoading){
  return <RestaurantLoading/>
 }
 if(!isLoading && error && error?.data?.message === "Restaurant not found"){
  return (
    <>
        <CreateRestaurantForm/>
    </>
  )
 }
 
 if(!isLoading && isSuccess && restaurantData?._id){
   return (
    <>
      <div className="bg-white shadow-md p-6">
        <UpdateLocationForm restaurant={restaurantData}/>
      </div>
    </>
   )
 }
}

export default UpdateLocationPage