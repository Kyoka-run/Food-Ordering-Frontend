import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Events from './Events';
import * as restaurantActions from '../../../redux/actions/restaurantActions';

// Mock the restaurant actions
vi.mock('../../../redux/actions/restaurantActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/restaurantActions');
  return {
    ...actual,
    getRestaurantEvents: vi.fn(() => ({ type: 'MOCK_GET_EVENTS' })),
    deleteEvent: vi.fn(() => ({ type: 'MOCK_DELETE_EVENT' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('Events component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches events on mount when restaurant ID is available', () => {
    const mockRestaurantId = 'restaurant123';
    
    renderWithProviders(<Events />, {
      preloadedState: {
        restaurant: {
          usersRestaurant: { restaurantId: mockRestaurantId },
          restaurantsEvents: [],
          loading: false
        }
      }
    });
    
    expect(restaurantActions.getRestaurantEvents).toHaveBeenCalledWith({
      restaurantId: mockRestaurantId,
      jwt: 'mock-jwt-token'
    });
  });

  it('displays empty state when no events exist', () => {
    renderWithProviders(<Events />, {
      preloadedState: {
        restaurant: {
          usersRestaurant: { restaurantId: 'restaurant123' },
          restaurantsEvents: [],
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('no-events-message')).toBeInTheDocument();
    expect(screen.getByTestId('events-count')).toHaveTextContent('0');
  });

  it('renders event cards when events exist', () => {
    const mockEvents = [
      {
        eventId: 'event1',
        name: 'Summer Party',
        image: 'party.jpg',
        startTime: '2023-07-01T18:00:00',
        endTime: '2023-07-01T22:00:00'
      },
      {
        eventId: 'event2',
        name: 'Winter Festival',
        image: 'winter.jpg',
        startTime: '2023-12-15T17:00:00',
        endTime: '2023-12-15T23:00:00'
      }
    ];
    
    renderWithProviders(<Events />, {
      preloadedState: {
        restaurant: {
          usersRestaurant: { restaurantId: 'restaurant123' },
          restaurantsEvents: mockEvents,
          loading: false
        }
      }
    });
    
    expect(screen.queryByTestId('no-events-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('events-count')).toHaveTextContent('2');
    expect(screen.getByTestId('events-grid')).toBeInTheDocument();
  });

  it('opens modal when add button is clicked', () => {
    renderWithProviders(<Events />, {
      preloadedState: {
        restaurant: {
          usersRestaurant: { restaurantId: 'restaurant123' },
          restaurantsEvents: [],
          loading: false
        }
      }
    });
    
    fireEvent.click(screen.getByTestId('add-event-button'));
    expect(screen.getByTestId('event-form')).toBeInTheDocument();
  });

  it('opens delete confirmation dialog when an event is deleted', () => {
    const mockEvents = [
      {
        eventId: 'event1',
        name: 'Summer Party',
        image: 'party.jpg',
        startTime: '2023-07-01T18:00:00',
        endTime: '2023-07-01T22:00:00'
      }
    ];
    
    renderWithProviders(<Events />, {
      preloadedState: {
        restaurant: {
          usersRestaurant: { restaurantId: 'restaurant123' },
          restaurantsEvents: mockEvents,
          loading: false
        }
      }
    });
    
    fireEvent.click(screen.getByTestId('delete-button-event1'));
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
  });

  it('calls deleteEvent when delete is confirmed', () => {
    const mockEvents = [
      {
        eventId: 'event1',
        name: 'Summer Party',
        image: 'party.jpg',
        startTime: '2023-07-01T18:00:00',
        endTime: '2023-07-01T22:00:00'
      }
    ];
    
    renderWithProviders(<Events />, {
      preloadedState: {
        restaurant: {
          usersRestaurant: { restaurantId: 'restaurant123' },
          restaurantsEvents: mockEvents,
          loading: false
        }
      }
    });
    
    // Open delete dialog
    fireEvent.click(screen.getByTestId('delete-button-event1'));
    
    // Confirm deletion
    fireEvent.click(screen.getByTestId('confirm-button'));
    
    expect(restaurantActions.deleteEvent).toHaveBeenCalledWith('event1', 'mock-jwt-token');
  });
});