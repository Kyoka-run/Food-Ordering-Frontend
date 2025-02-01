import { createReducer } from '@reduxjs/toolkit';
import {
  getAllRestaurantsRequest,
  getAllRestaurantsSuccess,
  getAllRestaurantsFailure,
  createRestaurantRequest,
  createRestaurantSuccess,
  createRestaurantFailure
} from '../actions/restaurantActions';

const initialState = {
  restaurants: [],
  usersRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
};

const restaurantReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllRestaurantsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllRestaurantsSuccess, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
    })
    .addCase(getAllRestaurantsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createRestaurantRequest, (state) => {
      state.loading = true;
    })
    .addCase(createRestaurantSuccess, (state, action) => {
      state.loading = false;
      state.usersRestaurant = action.payload;
    })
    .addCase(createRestaurantFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default restaurantReducer;