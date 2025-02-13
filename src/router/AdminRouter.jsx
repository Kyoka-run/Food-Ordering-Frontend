import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../component/admin/AdminSidebar";
import RestaurantDashboard from "../component/admin/RestaurantDashboard";
import RestaurantsOrder from "../component/admin/RestaurantsOrder";
import RestaurantsMenu from "../component/admin/RestaurantsMenu";
import AddMenuForm from "../component/admin/AddMenuForm";
import CreateRestaurantForm from "../component/admin/CreateRestaurantForm";
import Events from "../component/admin/Events";
import Category from "../component/admin/Category";
import Ingredients from "../component/admin/Ingredients";
import Details from "../component/admin/Details";
import AdminNavbar from "../component/admin/AdminNavbar";
import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
} from "../redux/actions/ingredientActions";
import { getRestaurantsCategory } from "../redux/actions/restaurantActions";
import { fetchRestaurantsOrder } from "../redux/actions/restaurantOrderActions";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, restaurant } = useSelector((store) => store);
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
          jwt: auth.jwt || jwt,
          restaurantId: restaurant.usersRestaurant?.restaurantId,
        })
      );
      dispatch(
        fetchRestaurantsOrder({
          restaurantId: restaurant.usersRestaurant?.restaurantId,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div>
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:flex justify-between">
        <div>
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>

        <div className="lg:w-[80vw]">
          <Routes>
            <Route path="/" element={<RestaurantDashboard />} />
            <Route path="/orders" element={<RestaurantsOrder />} />
            <Route path="/menu" element={<RestaurantsMenu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
            <Route path="/event" element={<Events />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/category" element={<Category />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRouter;