import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/restaurantActions';

const initialState = {
  restaurants: [], // All Restaurants
  usersRestaurant: null,
  restaurant: null, // Selected Restaurant
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: []
};

const restaurantReducer = createReducer(initialState, (builder) => {
  builder
    // Get All Restaurants
    .addCase(actions.getAllRestaurantsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getAllRestaurantsSuccess, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
    })
    .addCase(actions.getAllRestaurantsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get Restaurant By Id
    .addCase(actions.getRestaurantByIdRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getRestaurantByIdSuccess, (state, action) => {
      state.loading = false;
      state.restaurant = action.payload;
    })
    .addCase(actions.getRestaurantByIdFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get Restaurant By User Id
    .addCase(actions.getRestaurantByUserIdRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getRestaurantByUserIdSuccess, (state, action) => {
      state.loading = false;
      state.usersRestaurant = action.payload;
    })
    .addCase(actions.getRestaurantByUserIdFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Create Restaurant
    .addCase(actions.createRestaurantRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.createRestaurantSuccess, (state, action) => {
      state.loading = false;
      state.usersRestaurant = action.payload;
    })
    .addCase(actions.createRestaurantFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Restaurant
    .addCase(actions.updateRestaurantRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateRestaurantSuccess, (state, action) => {
      state.loading = false;
      state.usersRestaurant = action.payload;
    })
    .addCase(actions.updateRestaurantFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Restaurant
    .addCase(actions.deleteRestaurantRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.deleteRestaurantSuccess, (state, action) => {
      state.loading = false;
      state.restaurants = state.restaurants.filter(item => item.restaurantId !== action.payload);
      state.usersRestaurant = state.usersRestaurant.filter(item => item.restaurantId !== action.payload);
    })
    .addCase(actions.deleteRestaurantFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Restaurant Status
    .addCase(actions.updateRestaurantStatusRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateRestaurantStatusSuccess, (state, action) => {
      state.loading = false;
      state.usersRestaurant = action.payload;
    })
    .addCase(actions.updateRestaurantStatusFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Create Event
    .addCase(actions.createEventRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.createEventSuccess, (state, action) => {
      state.loading = false;
      state.events = [...state.events, action.payload];
      state.restaurantsEvents = [...state.restaurantsEvents, action.payload];
    })
    .addCase(actions.createEventFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get All Events
    .addCase(actions.getAllEventsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getAllEventsSuccess, (state, action) => {
      state.loading = false;
      state.events = action.payload;
    })
    .addCase(actions.getAllEventsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get Restaurant Events
    .addCase(actions.getRestaurantEventsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getRestaurantEventsSuccess, (state, action) => {
      state.loading = false;
      state.restaurantsEvents = action.payload;
    })
    .addCase(actions.getRestaurantEventsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Event
    .addCase(actions.deleteEventRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.deleteEventSuccess, (state, action) => {
      state.loading = false;
      state.events = state.events.filter(item => item.restaurantId !== action.payload);
      state.restaurantsEvents = state.restaurantsEvents.filter(item => item.restaurantId !== action.payload);
    })
    .addCase(actions.deleteEventFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Create Category
    .addCase(actions.createCategoryRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.createCategorySuccess, (state, action) => {
      state.loading = false;
      state.categories = [...state.categories, action.payload];
    })
    .addCase(actions.createCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get Restaurants Category
    .addCase(actions.getRestaurantsCategoryRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getRestaurantsCategorySuccess, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    })
    .addCase(actions.getRestaurantsCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Restaurants Category
    .addCase(actions.updateCategoryRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateCategorySuccess, (state, action) => {
      state.loading = false;
      state.categories = state.categories.map(category => 
        category.categoryId === action.payload.categoryId ? action.payload : category
      );
    })
    .addCase(actions.updateCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default restaurantReducer;