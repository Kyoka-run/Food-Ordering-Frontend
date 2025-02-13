import './App.css'
import theme from './theme/Theme'
import Routers from './router/Routers'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/actions/authActions";
import { findCart } from "./redux/actions/cartActions";
import { getRestaurantByUserId, getAllRestaurants} from "./redux/actions/restaurantActions";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);
  
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
    }
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?.roles?.includes("ROLE_RESTAURANT_OWNER")) {
      dispatch(getRestaurantByUserId(jwt));
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
