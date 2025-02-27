import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const RestaurantTable = ({ isDashboard, name }) => {
  const { restaurant } = useSelector((store) => store);

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table  aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Banner</TableCell>
                <TableCell>Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                {!isDashboard && <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.restaurants.slice(0,isDashboard?7:restaurant.restaurants.length).map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.name} src={item.imageUrl} />{" "}
                  </TableCell>
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.cuisineType}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.address}
                  </TableCell>

                  {!isDashboard && <TableCell sx={{ textAlign: "center" }}>
                    {item.contactInformation.email}
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default RestaurantTable;
