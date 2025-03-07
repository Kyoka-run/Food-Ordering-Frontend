import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../redux/reducers/authReducer';
import addressReducer from '../redux/reducers/addressReducer';
import restaurantReducer from '../redux/reducers/restaurantReducer';
import menuReducer from '../redux/reducers/menuReducer';
import cartReducer from '../redux/reducers/cartReducer';
import orderReducer from '../redux/reducers/orderReducer';
import restaurantsOrderReducer from '../redux/reducers/restaurantOrderReducer';
import ingredientReducer from '../redux/reducers/ingredientReducer';
import superAdminReducer from '../redux/reducers/superAdminReducer';

export function renderWithProviders(ui, {
  preloadedState = {},
  // Create a custom store with the same reducers as the real app
  store = configureStore({
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
    preloadedState
  }),
  ...renderOptions
} = {}) {
  // Wrap the component with both Router and Redux provider
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  // Return the rendered UI along with the store instance
  return { 
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }) 
  };
}