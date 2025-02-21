import React, { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../redux/actions/restaurantActions";
import AddRestaurantCard from "./AddRestaurantCard";

const AdminDashboard = () => {
  const {restaurant} = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantByUserId());
  }, []);

  return (
    <div className="lg:px-20 lg:flex flex-wrap justify-center">
      {restaurant.usersRestaurant.map((item) => (
        <RestaurantCard item={item}/>
      ))}
      {restaurant.usersRestaurant.length<1 && <AddRestaurantCard/>}
    </div>
  );
};

export default AdminDashboard;
