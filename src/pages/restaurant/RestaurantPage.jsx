import { useGetMyRestaurantQuery } from "../../redux/features/restaurant/restaurantApi";
import { restaurantData } from "../../data/data";
import CreateRestaurantForm from "../../components/restaurant/CreateRestaurantForm";
import RestaurantDetails from "../../components/restaurant/RestaurantDetails";
import RestaurantLoading from "../../components/Loader/RestaurantLoading";


const RestaurantPage = () => {
  const { data, isLoading, isSuccess, error} = useGetMyRestaurantQuery(undefined);
  const RestaurantData = data?.data;

 if(isLoading){
  return <RestaurantLoading/>
 }
 if(!isLoading && error && error?.data?.message === "Restaurant not found"){
  return <CreateRestaurantForm/>
 }
 
 if(!isLoading && isSuccess && RestaurantData?._id){
   return <RestaurantDetails data={RestaurantData}/>
 }
 
};

export default RestaurantPage;
