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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../redux/actions/superAdminActions";
import GlobalLoading from "../GlobalLoading";

const SuperAdminCustomer = ({ isDashboard }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.superAdmin.customers);
  const loading = useSelector((state) => state.superAdmin.loading);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getCustomers(jwt));
  }, [dispatch, jwt]);

  return (
    <Box className="p-4" data-testid="customer-management">
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" className="text-gray-600" data-testid="card-title">
              Customer Management
            </Typography>
          }
          sx={{
            pt: 2,
            "& .MuiCardHeader-action": { mt: 0.6 }
          }}
          data-testid="card-header"
        />
        <TableContainer className="max-h-[70vh] overflow-auto">
          <Table stickyHeader data-testid="customers-table">
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
              {customers.slice(0, isDashboard ? 5 : undefined).map((customer) => (
                <TableRow
                  hover
                  key={customer.userId}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  data-testid={`customer-row-${customer.userId}`}
                >
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar sx={{ bgcolor: "#ff6f00" }} data-testid={`customer-avatar-${customer.userId}`}>
                        {customer.username?.[0]?.toUpperCase()}
                      </Avatar>
                      <Typography data-testid={`customer-name-${customer.userId}`}>{customer.username}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell data-testid={`customer-email-${customer.userId}`}>{customer.email}</TableCell>
                  <TableCell align="center" data-testid={`customer-id-${customer.userId}`}>{customer.userId}</TableCell>
                  <TableCell align="center" data-testid={`customer-roles-${customer.userId}`}>
                    {customer.roles?.join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={customer.status || "ACTIVE"}
                      color="success"
                      size="small"
                      data-testid={`customer-status-${customer.userId}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500" data-testid="no-customers-message">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading */}
      <GlobalLoading loading={loading} />
    </Box>
  );
};

export default SuperAdminCustomer;