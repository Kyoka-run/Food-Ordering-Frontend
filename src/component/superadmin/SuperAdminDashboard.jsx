import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux';

const DashboardCard = ({ title, value, icon, color }) => (
  <Card className="p-5" data-testid={`dashboard-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
    <div className="flex justify-between items-center">
      <div>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" className="mt-2" data-testid={`${title.toLowerCase().replace(/\s+/g, '-')}-count`}>
          {value}
        </Typography>
      </div>
      <Box sx={{ 
        backgroundColor: `${color}20`,
        padding: '1rem',
        borderRadius: '50%'
      }}>
        {React.cloneElement(icon, { sx: { fontSize: 40, color: color } })}
      </Box>
    </div>
  </Card>
);

const SuperAdminDashboard = () => {
  const restaurantsCount = useSelector(state => state.restaurant.restaurants?.length || 0);
  const customersCount = useSelector(state => state.superAdmin.customers?.length || 0);

  const dashboardItems = [
    {
      title: "Total Restaurants",
      value: restaurantsCount,
      icon: <RestaurantIcon />,
      color: "#ff6f00"
    },
    {
      title: "Total Customers",
      value: customersCount,
      icon: <PeopleIcon />,
      color: "#2196f3"
    }
  ];

  return (
    <div className="p-8" data-testid="super-admin-dashboard">
      <Typography variant="h4" className="mb-6" data-testid="dashboard-title">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={4}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>

      <div className="mt-8">
        <Typography variant="h5" className="mb-4">
          Recent Activities
        </Typography>
        <Card className="p-4" data-testid="recent-activities-card">
          <Typography color="textSecondary">
            No recent activities to display
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;