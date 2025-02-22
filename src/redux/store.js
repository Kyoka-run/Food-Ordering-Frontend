import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import addressReducer from './reducers/addressReducer';
import restaurantReducer from './reducers/restaurantReducer';
import menuReducer from './reducers/menuReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import restaurantsOrderReducer from './reducers/restaurantOrderReducer';
import ingredientReducer from './reducers/ingredientReducer';
import superAdminReducer from './reducers/superAdminReducer';

const jwt = localStorage.getItem("jwt") || null;

const initialState = {
  auth: { jwt },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    restaurant: restaurantReducer,
    menu: menuReducer, 
    cart: cartReducer,
    order: orderReducer,
    restaurantsOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer,
    superAdmin: superAdminReducer
  },
  preloadedState: initialState
});