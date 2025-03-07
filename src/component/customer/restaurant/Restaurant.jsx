import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import MenuItemCard from "./MenuItemCard";
import GlobalLoading from "../../GlobalLoading";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../redux/actions/restaurantActions";
import { getMenuItemsByRestaurantId } from "../../../redux/actions/menuActions";

const foodTypes = [
  {label:"All",value:"all"},
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  {label:"Seasonal",value:"seasonal"},
];

const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const categories = useSelector((state) => state.restaurant.categories);
  const menuItems = useSelector((state) => state.menu.menuItems);
  const loading = useSelector((state) => 
    state.restaurant.loading || state.menu.loading
  );
  
  const jwt = useSelector((state) => state.auth.jwt);

  // Get filter values from URL
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  // Fetch restaurant data and menu items on component mount or when filters change
  useEffect(() => {
    dispatch(
      getRestaurantById({
        jwt,
        restaurantId: id,
      })
    );
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: foodType==="seasonal",
        vegetarian: foodType==="vegetarian",
        nonveg: foodType==="non_vegetarian",
        foodCategory: foodCategory || ""
      })
    );
    dispatch(getRestaurantsCategory({restaurantId:id, jwt}))
  }, [id, foodType, foodCategory, dispatch, jwt]);

  // Handle filter changes
  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("food_category");
    }
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <div data-testid="restaurant-page">
      <div className="px-5 lg:px-20 ">
        {/* Restaurant Header Section */}
        <section>
          <h1 className="text-gray-600 py-2 mt-10" data-testid="restaurant-breadcrumb">
            {restaurant?.name}/
            {restaurant?.address}/Order Online
          </h1>
          
          {/* Restaurant Images */}
          <div data-testid="restaurant-images">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img
                  className="w-full h-[40vh] object-cover"
                  src={restaurant?.images?.[0]}
                  alt=""
                  data-testid="restaurant-main-image"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  className="w-full h-[40vh] object-cover"
                  src={restaurant?.images?.[1]}
                  alt=""
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  className="w-full h-[40vh] object-cover"
                  src={restaurant?.images?.[2]}
                  alt=""
                />
              </Grid>
            </Grid>
          </div>
          
          {/* Restaurant Info */}
          <div className="pt-3 pb-5" data-testid="restaurant-info">
            <h1 className="text-4xl font-semibold" data-testid="restaurant-name">
              {restaurant?.name}
            </h1>
            <p className="text-gray-500 mt-1" data-testid="restaurant-description">
              {restaurant?.description}
            </p>
            <div className="space-y-3 mt-3">
              <p className="text-gray-500 flex items-center gap-3" data-testid="restaurant-address">
                <LocationOnIcon/> <span>{restaurant?.address}</span> 
              </p>
              <p className="flex items-center gap-3 text-gray-500" data-testid="restaurant-hours">
                <TodayIcon/> <span className="text-orange-300">{restaurant?.openingHours} (Today)</span>  
              </p>
            </div>
          </div>
        </section>
        <Divider />

        {/* Menu and Filter Section */}
        <section className="pt-[2rem] lg:flex relative" data-testid="menu-section">
          {/* Filters Sidebar */}
          <div className="space-y-10 lg:w-[20%] filter" data-testid="filter-sidebar">
            <div className="box space-y-5 lg:sticky top-28">
              
              <div className="">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                  Food Type
                </Typography>
                <FormControl className="py-10 space-y-5" component="fieldset">
                  <RadioGroup
                    name="food_type"
                    value={foodType || "all"}
                    onChange={handleFilter}
                  >
                    {foodTypes?.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        sx={{ color: "gray" }}
                        data-testid={`food-type-${item.value}`}
                      />
                    ))}
                  </RadioGroup>
                  <Divider/>
                  <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                    Food Category
                  </Typography>
                  <RadioGroup
                    name="food_category"
                    value={foodCategory || "all"}
                    onChange={handleFilter}
                  >
                    <FormControlLabel
                      value={"all"}
                      control={<Radio />}
                      label={"All"}
                      sx={{ color: "gray" }}
                      data-testid="food-category-all"
                    />
                    {categories.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                        sx={{ color: "gray" }}
                        data-testid={`food-category-${item.name}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          
          {/* Menu Items Section */}
          <div className="lg:w-[80%] space-y-5 lg:pl-10" data-testid="menu-items-container">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <MenuItemCard item={item} key={item.foodId} />
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" data-testid="no-menu-items">
                No menu items found. Try changing your filters.
              </Typography>
            )}
          </div>
        </section>
      </div>
      
      {/* Loading Indicator */}
      <GlobalLoading loading={loading} />
    </div>
  );
};

export default Restaurant;