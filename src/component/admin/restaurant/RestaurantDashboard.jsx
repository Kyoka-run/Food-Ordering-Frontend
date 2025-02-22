import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RestaurantTable from "./RestaurantTable";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../../redux/actions/restaurantActions";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
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
        <div className="w-full flex justify-center items-center">
          {restaurant.usersRestaurant ? (
            <RestaurantTable item={restaurant.usersRestaurant} />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <RestaurantIcon sx={{ fontSize: 40, marginBottom: 2 }}/>
              <p 
                className="text-blue-500 text-2xl font-semibold cursor-pointer hover:text-blue-700"
                onClick={() => navigate("/admin/restaurant/add-restaurant")}
              >
                Click to create your first restaurant
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;