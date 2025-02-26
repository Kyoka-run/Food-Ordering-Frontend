import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  updateRestaurantStatus,
} from "../../../redux/actions/restaurantActions";

const Details = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.restaurantId,
        jwt: jwt,
      })
    );
  };
  
  return (
    <div className="lg:px-20 px-5">
      {/* Restaurant Name and Status Section */}
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {restaurant.usersRestaurant?.name}
        </h1>
        <div>
          <Button
            onClick={handleRestaurantStatus}
            size="large"
            className="py-[1rem] px-[2rem]"
            variant="contained"
            color={restaurant.usersRestaurant?.open ? "error" : "primary"}
          >
            {restaurant.usersRestaurant?.open
              ? "Close"
              : "Open"}
          </Button>
        </div>
      </div>

      {/* Restaurant Information Grid */}
      <Grid container spacing={2}>
        {/* Basic Restaurant Info */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Restaurant</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Restaurant Name</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Cuisine Type</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Opning Hours</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Status</p>
                  <div className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="text-black px-5 py-2 rounded-full bg-red-400">
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Address</span>}
            />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <div className="flex">
                  <p className="w-48">Address</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} lg={7}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Contact</span>}
            />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <div className="flex">
                  <p className="w-48">Email</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-48">Social</p>
                  <div className="text-gray-400 flex items-center pb-3">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    <a
                      target="_blank"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
