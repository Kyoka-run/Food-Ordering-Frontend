import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Chip,
  Backdrop,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../redux/actions/superAdminActions";

const SuperAdminCustomerTable = ({ isDashboard }) => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getCustomers(jwt));
  }, [dispatch]);

  const getRoleColor = (role) => {
    switch (role) {
      case "ROLE_CUSTOMER":
        return "primary";
      case "ROLE_RESTAURANT_OWNER":
        return "secondary";
      case "ROLE_ADMIN":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box className="p-4">
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" className="text-gray-600">
              Customer Management
            </Typography>
          }
          sx={{
            pt: 2,
            "& .MuiCardHeader-action": { mt: 0.6 }
          }}
        />
        <TableContainer className="max-h-[70vh] overflow-auto">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">User ID</TableCell>
                <TableCell align="center">Roles</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {superAdmin.customers.slice(0, isDashboard ? 5 : undefined).map((customer) => (
                <TableRow
                  hover
                  key={customer.userId}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar sx={{ bgcolor: "#e91e63" }}>
                        {customer.username?.[0]?.toUpperCase()}
                      </Avatar>
                      <Typography>{customer.username}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell align="center">{customer.userId}</TableCell>
                  <TableCell align="center">
                    {customer.roles?.map((role) => (
                      <Chip
                        key={role}
                        label={role.replace('ROLE_', '')}
                        color={getRoleColor(role)}
                        size="small"
                        className="m-1"
                      />
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={customer.status || "ACTIVE"}
                      color="success"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={superAdmin.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SuperAdminCustomerTable;