import { useGetMyRestaurantQuery } from "../../redux/features/restaurant/restaurantApi";
import CreateRestaurantForm from "../../components/restaurant/CreateRestaurantForm";
import RestaurantLoading from "../../components/Loader/RestaurantLoading";
import MyRestaurant from "../../components/restaurant/MyRestaurant";


const RestaurantPage = () => {
  const { data, isLoading, isSuccess, error} = useGetMyRestaurantQuery(undefined);
  const restaurantData = data?.data;

 if(isLoading){
  return <RestaurantLoading/>
 }
 if(!isLoading && error && error?.data?.message === "Restaurant not found"){
  return <CreateRestaurantForm/>
 }
 
 if(!isLoading && isSuccess && restaurantData?._id){
   return <MyRestaurant data={restaurantData}/>
 }
 
};

export default RestaurantPage;
