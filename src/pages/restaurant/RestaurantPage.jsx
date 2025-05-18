import { useGetMyRestaurantQuery } from "../../redux/features/restaurant/restaurantApi";
import RestaurantLoading from "../../components/Loader/RestaurantLoading";
import MyRestaurant from "../../components/restaurant/MyRestaurant";
import CreateRestaurantForm from "../../components/createRestaurant/CreateRestaurantForm";


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
