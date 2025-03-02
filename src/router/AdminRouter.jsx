import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RestaurantDashboard from "../component/admin/restaurant/RestaurantDashboard";
import RestaurantsOrder from "../component/admin/order/RestaurantsOrder";
import RestaurantsMenu from "../component/admin/food/RestaurantsMenu";
import Events from "../component/admin/event/Events";
import Category from "../component/admin/category/Category";
import Ingredients from "../component/admin/ingredient/Ingredients";
import AdminNavbar from "../component/admin/AdminNavbar";
import Navbar from "../component/Navbar";
import { getIngredientCategory, getIngredientsOfRestaurant } from "../redux/actions/ingredientActions";
import { getRestaurantsCategory } from "../redux/actions/restaurantActions";
import { fetchRestaurantsOrder } from "../redux/actions/restaurantOrderActions";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const usersRestaurant = useSelector((state) => state.restaurant.usersRestaurant);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (usersRestaurant) {
      dispatch(
        getIngredientCategory({ jwt, id: usersRestaurant?.restaurantId })
      );
      dispatch(
        getIngredientsOfRestaurant({ jwt, id: usersRestaurant?.restaurantId })
      );
      dispatch(
        getRestaurantsCategory({
          jwt,
          restaurantId: usersRestaurant?.restaurantId,
        })
      );
      dispatch(
        fetchRestaurantsOrder({
          restaurantId: usersRestaurant?.restaurantId,
          jwt,
        })
      );
    }
  }, [usersRestaurant]);

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
        </Routes>
      </div>
    </div>
  );
};

export default AdminRouter;