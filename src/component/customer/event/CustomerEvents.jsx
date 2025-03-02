import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../redux/actions/restaurantActions';
import EventCard from '../../admin/event/EventCard';
import GlobalLoading from "../../GlobalLoading";

const CustomerEvents = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  // Fetch all events when component mounts
  useEffect(() => {
    dispatch(getAllEvents({ jwt }))
  }, [dispatch, jwt]);

  // Group events by restaurant for better organization
  const groupedEvents = restaurant.events.reduce((acc, event) => {
    if (!acc[event.restaurantId]) {
      acc[event.restaurantId] = {
        restaurantName: event.restaurantName || 'Unknown Restaurant',
        events: []
      };
    }
    acc[event.restaurantId].events.push(event);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <Typography variant="h5" className="text-center mb-6">
        Upcoming Events
      </Typography>

      {/* Summary section */}
      <Paper className="p-4 mb-6 bg-gray-50">
        <Typography variant="h6" gutterBottom>
          {restaurant.events.length} Events Available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discover special promotions, theme nights, and exciting events at your favorite restaurants.
          Don't miss out on these limited-time experiences!
        </Typography>
      </Paper>

      {/* Events by restaurant */}
      {Object.keys(groupedEvents).length > 0 ? (
        Object.values(groupedEvents).map((group, index) => (
          <Box key={index} className="mb-10">
            <Typography variant="h6" className="mb-3 border-b pb-2">
              {group.restaurantName}
            </Typography>
            <Box className="flex flex-wrap justify-center">
              {group.events.map((event) => (
                <EventCard
                  key={event.eventId}
                  item={event}
                  isAdmin={false} // Customer view - no edit/delete buttons
                />
              ))}
            </Box>
          </Box>
        ))
      ) : (
        <Paper className="p-8 text-center">
          <Typography variant="body1" color="text.secondary">
            No upcoming events at this time. Check back later for exciting promotions!
          </Typography>
        </Paper>
      )}

      {/* Loading */}
      <GlobalLoading loading={restaurant.loading} />
    </div>
  );
};

export default CustomerEvents;