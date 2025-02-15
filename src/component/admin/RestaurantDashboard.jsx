import React, { useEffect } from "react";
import RestaurantTable from "./RestaurantTable";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../redux/actions/restaurantActions";
import AddRestaurantCard from "./AddRestaurantCard";

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector(state => state);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getRestaurantByUserId(jwt));
  }, [dispatch, jwt]);

  return (
    <div>
      {/* Restaurant Cards Section */}
      <div className="p-5">
        <div className="flex gap-5">
          {restaurant.usersRestaurant ? (
            <RestaurantTable item={restaurant.usersRestaurant} />
          ) : (
            <AddRestaurantCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;