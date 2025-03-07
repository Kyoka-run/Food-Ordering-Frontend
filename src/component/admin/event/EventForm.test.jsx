import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import EventForm from './EventForm';
import * as restaurantActions from '../../../redux/actions/restaurantActions';

// Mock the restaurant actions
vi.mock('../../../redux/actions/restaurantActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/restaurantActions');
  return {
    ...actual,
    createEvent: vi.fn(() => ({ type: 'MOCK_CREATE_EVENT' })),
    updateEvent: vi.fn(() => ({ type: 'MOCK_UPDATE_EVENT' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('EventForm component', () => {
  const handleCloseMock = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders create form when no event is provided', () => {
    renderWithProviders(
      <EventForm handleClose={handleCloseMock} />
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create New Event');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Create Event');
  });

  it('renders update form when event is provided', () => {
    const mockEvent = {
      eventId: 'event-123',
      name: 'Summer Festival',
      location: 'Beach Front',
      description: 'Annual summer event',
      image: 'image-url.jpg'
    };
    
    renderWithProviders(
      <EventForm handleClose={handleCloseMock} event={mockEvent} />
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Event');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Update Event');
    expect(screen.getByTestId('event-name-input')).toHaveValue('Summer Festival');
  });

  it('calls handleClose when cancel button is clicked', () => {
    renderWithProviders(
      <EventForm handleClose={handleCloseMock} />
    );
    
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls createEvent when form is submitted in create mode', () => {
    const mockRestaurantId = 'restaurant-123';
    
    renderWithProviders(
      <EventForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId }
          }
        }
      }
    );
    
    // Fill required fields
    fireEvent.change(screen.getByTestId('event-name-input'), { 
      target: { value: 'New Event' } 
    });
    fireEvent.change(screen.getByTestId('event-location-input'), { 
      target: { value: 'Restaurant Patio' } 
    });
    fireEvent.change(screen.getByTestId('event-image-input'), { 
      target: { value: 'image-url.jpg' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that createEvent was called
    expect(restaurantActions.createEvent).toHaveBeenCalledTimes(1);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
  
  it('calls updateEvent when form is submitted in update mode', () => {
    const mockEvent = {
      eventId: 'event-123',
      name: 'Summer Festival',
      location: 'Beach Front',
      description: 'Annual summer event',
      image: 'image-url.jpg'
    };
    
    renderWithProviders(
      <EventForm handleClose={handleCloseMock} event={mockEvent} />
    );
    
    // Update a field
    fireEvent.change(screen.getByTestId('event-name-input'), { 
      target: { value: 'Updated Festival' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that updateEvent was called
    expect(restaurantActions.updateEvent).toHaveBeenCalledTimes(1);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});