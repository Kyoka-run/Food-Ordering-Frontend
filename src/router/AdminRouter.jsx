import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RestaurantDashboard from "../component/admin/restaurant/RestaurantDashboard";
import RestaurantsOrder from "../component/admin/order/RestaurantsOrder";
import RestaurantsMenu from "../component/admin/food/RestaurantsMenu";
import Events from "../component/admin/event/Events";
import Category from "../component/admin/category/Category";
import Ingredients from "../component/admin/ingredient/Ingredients";
import Details from "../component/admin/restaurant/Details";
import AdminNavbar from "../component/admin/AdminNavbar";
import Navbar from "../component/Navbar";
import { getIngredientCategory, getIngredientsOfRestaurant } from "../redux/actions/ingredientActions";
import { getRestaurantsCategory } from "../redux/actions/restaurantActions";
import { fetchRestaurantsOrder } from "../redux/actions/restaurantOrderActions";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getIngredientCategory({ jwt, id: restaurant.usersRestaurant?.restaurantId })
      );
      dispatch(
        getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant?.restaurantId })
      );
      dispatch(
        getRestaurantsCategory({
          jwt,
          restaurantId: restaurant.usersRestaurant?.restaurantId,
        })
      );
      dispatch(
        fetchRestaurantsOrder({
          restaurantId: restaurant.usersRestaurant?.restaurantId,
          jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <AdminNavbar/>
      <div className="lg:px-5 lg:py-5 justify-center">
        <Routes>
          <Route path="/" element={<RestaurantDashboard />} />
          <Route path="/orders" element={<RestaurantsOrder />} />
          <Route path="/menu" element={<RestaurantsMenu />} />
          <Route path="/event" element={<Events />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/category" element={<Category />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRouter;