import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Grid,
  Paper,
  IconButton
} from "@mui/material";
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantEvents,
  deleteEvent
} from "../../../redux/actions/restaurantActions";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import GlobalLoading from "../../GlobalLoading";
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog";

const Events = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.restaurant.loading);
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const restaurantEvents = useSelector((state) => state.restaurant.restaurantsEvents);
  const jwt = localStorage.getItem("jwt");
  
  // State for modal and selected event
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Fetch events when component mounts or restaurant changes
  useEffect(() => {
    if (restaurantId) {
      dispatch(getRestaurantEvents({
        restaurantId,
        jwt
      }));
    }
  }, [dispatch, restaurantId, jwt]);

  // Modal handlers
  const handleOpenModal = (event = null) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setOpenModal(false);
  };

  // Event handlers
  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (eventToDelete) {
      dispatch(deleteEvent(eventToDelete, jwt));
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="p-4" data-testid="events-container">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" data-testid="page-title">Event Management</Typography>
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          data-testid="add-event-button"
        >
          <Add />
        </IconButton>
      </Box>
      
      {/* Events count summary */}
      <Paper className="p-4 mb-4 bg-gray-50" data-testid="events-summary">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Total Events
            </Typography>
            <Typography variant="h4" data-testid="events-count">
              {restaurantEvents?.length || 0}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body2" color="text.secondary">
              Events are a great way to engage with your customers and promote your restaurant. 
              You can create special promotions, theme nights, or holiday celebrations.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Events Grid */}
      {restaurantEvents?.length > 0 ? (
        <Box className="mt-5 flex flex-wrap justify-center" data-testid="events-grid">
          {restaurantEvents.map((item) => (
            <EventCard 
              key={item.eventId} 
              item={item} 
              isAdmin={true}
              onEdit={handleOpenModal}
              onDelete={handleDeleteClick}
              data-testid={`event-card-${item.eventId}`}
            />
          ))}
        </Box>
      ) : (
        <Paper className="p-8 mt-4 text-center" data-testid="no-events-message">
          <Typography variant="body1" color="text.secondary">
            No events found. Create your first event to engage with customers!
          </Typography>
        </Paper>
      )}

      {/* Event Form Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="event-modal-title"
        data-testid="event-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <EventForm 
            handleClose={handleCloseModal}
            event={selectedEvent}
          />
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        itemName={restaurantEvents?.find(event => event.eventId === eventToDelete)?.name}
        contentText="This event will be permanently removed and no longer visible to customers."
        data-testid="delete-dialog"
      />

      {/* Loading */}
      <GlobalLoading loading={loading} />
    </div>
  );
};

export default Events;