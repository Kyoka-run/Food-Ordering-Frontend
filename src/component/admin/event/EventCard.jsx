import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

const EventCard = ({ item, isAdmin = false, onEdit, onDelete }) => {
  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return dayjs(dateString).format("MMM D, YYYY h:mm A");
  };

  // Generate status chip based on event dates
  const getEventStatusChip = () => {
    const now = dayjs();
    const start = dayjs(item.startTime);
    const end = dayjs(item.endTime);

    if (end.isBefore(now)) {
      return <Chip size="small" color="error" label="Ended" data-testid={`event-status-${item.eventId}`} />;
    } else if (start.isBefore(now) && end.isAfter(now)) {
      return <Chip size="small" color="success" label="Ongoing" data-testid={`event-status-${item.eventId}`} />;
    } else {
      return <Chip size="small" color="warning" label="Upcoming" data-testid={`event-status-${item.eventId}`} />;
    }
  };

  return (
    <Card 
      sx={{ 
        width: 345, 
        m: 1,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.12)'
        }
      }}
      data-testid={`event-card-${item.eventId}`}
    >
      <CardMedia
        sx={{ 
          height: 220,
          position: 'relative'
        }}
        image={item.image}
        title={item.name}
        data-testid={`event-image-${item.eventId}`}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8,
          display: 'flex',
          gap: 0.5
        }}>
          {getEventStatusChip()}
        </Box>
      </CardMedia>

      <CardContent>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div" 
          className="font-medium"
          data-testid={`event-name-${item.eventId}`}
        >
          {item.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          className="mb-3"
          data-testid={`event-description-${item.eventId}`}
        >
          {item.description || "No description provided"}
        </Typography>
        
        <Box className="space-y-2 mt-4">
          {item.location && (
            <Box className="flex items-center gap-2">
              <LocationOnIcon fontSize="small" color="action" />
              <Typography 
                variant="body2" 
                className="text-gray-600"
                data-testid={`event-location-${item.eventId}`}
              >
                {item.location}
              </Typography>
            </Box>
          )}
          
          <Box className="flex items-center gap-2">
            <CalendarTodayIcon fontSize="small" color="primary" />
            <Typography 
              variant="body2" 
              className="text-blue-500"
              data-testid={`event-start-time-${item.eventId}`}
            >
              {formatDate(item.startTime)}
            </Typography>
          </Box>
          
          <Box className="flex items-center gap-2">
            <AccessTimeIcon fontSize="small" color="error" />
            <Typography 
              variant="body2" 
              className="text-red-500"
              data-testid={`event-end-time-${item.eventId}`}
            >
              {formatDate(item.endTime)}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {isAdmin && (
        <CardActions disableSpacing className="flex justify-end">
          <Tooltip title="Edit Event">
            <IconButton 
              aria-label="edit" 
              onClick={() => onEdit(item)}
              color="primary"
              data-testid={`edit-button-${item.eventId}`}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Event">
            <IconButton 
              aria-label="delete" 
              onClick={() => onDelete(item.eventId)}
              color="error"
              data-testid={`delete-button-${item.eventId}`}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
};

export default EventCard;