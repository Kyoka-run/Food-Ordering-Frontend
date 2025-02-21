import './App.css'
import theme from './theme/Theme'
import Routers from './router/Routers'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllRestaurants} from "./redux/actions/restaurantActions";
import { getUser } from "./redux/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, []);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

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
