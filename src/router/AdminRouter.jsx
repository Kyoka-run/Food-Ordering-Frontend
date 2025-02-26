import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../component/admin/AdminSidebar";
import RestaurantDashboard from "../component/admin/restaurant/RestaurantDashboard";
import RestaurantsOrder from "../component/admin/order/RestaurantsOrder";
import RestaurantsMenu from "../component/admin/food/RestaurantsMenu";
import AddMenuForm from "../component/admin/food/AddMenuForm";
import CreateRestaurantForm from "../component/admin/restaurant/CreateRestaurantForm";
import Events from "../component/admin/event/Events";
import Category from "../component/admin/category/Category";
import Ingredients from "../component/admin/ingredient/Ingredients";
import Details from "../component/admin/restaurant/Details";
import AdminNavbar from "../component/admin/AdminNavbar";
import UpdateRestaurantForm from "../component/admin/restaurant/UpdateRestaurantForm";
import UpdateMenuForm from "../component/admin/food/UpdateMenuForm";
import { getIngredientCategory, getIngredientsOfRestaurant } from "../redux/actions/ingredientActions";
import { getRestaurantsCategory } from "../redux/actions/restaurantActions";
import { fetchRestaurantsOrder } from "../redux/actions/restaurantOrderActions";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
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
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:px-5 lg:py-5 justify-center">
        <div>
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>
        <div>
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
            <Route path="/update/:id" element={<UpdateRestaurantForm />} />
            <Route path="/menu/update/:foodId" element={<UpdateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRouter;