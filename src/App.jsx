import './App.css'
import theme from './theme/Theme'
import Routers from './router/Routers'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/actions/authActions";
import { findCart } from "./redux/actions/cartActions";
import {
  getRestaurantByUserId,
} from "./redux/actions/restaurantActions";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
    }
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?.role == "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);

  return (
    <>   
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routers />
      </ThemeProvider>
    </>
  )
}

export default App
