import React from "react";
import { Link } from "react-router-dom";
import RestaurantDetail from "../../components/restaurantComponents/RestaurantDetail";
const RestaurantDetails = () => {

  return (
    <div className="p-6 bg-gray-100">
        <div className="flex gap-x-2 mb-5">
            <Link className="py-2 px-4 !text-white rounded-full !bg-gray-700" to={'/my-details'}>My Details</Link>
            <Link className="py-2 px-4 !text-white rounded-full !bg-gray-700" to={'/restaurant-details'}>Restaurant Details</Link>
        </div>
       <RestaurantDetail/>
     
    </div>
  )
}

export default RestaurantDetails
