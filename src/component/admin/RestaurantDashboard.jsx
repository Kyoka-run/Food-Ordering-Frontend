import React from "react";
import { Grid } from "@mui/material";
import OrdersTable from "./OrderTable";
import MenuItemTable from "./MenuItemTable";

const RestaurantDashboard = () => {

  return (
    <div className="px-2">
      <Grid container spacing={1}>
        <Grid lg={6} xs={12} item>
          <OrdersTable name={"Recent Order"} isDashboard={true} />
        </Grid>
        <Grid lg={6} xs={12} item>
          <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDashboard;
