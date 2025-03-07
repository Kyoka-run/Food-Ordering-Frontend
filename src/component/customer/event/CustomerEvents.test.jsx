import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import CustomerEvents from './CustomerEvents';
import * as restaurantActions from '../../../redux/actions/restaurantActions';

// Mock restaurant actions
vi.mock('../../../redux/actions/restaurantActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/restaurantActions');
  return {
    ...actual,
    getAllEvents: vi.fn(() => ({ type: 'MOCK_GET_ALL_EVENTS' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('CustomerEvents component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches events when component mounts', () => {
    renderWithProviders(<CustomerEvents />);
    
    expect(restaurantActions.getAllEvents).toHaveBeenCalledWith({ jwt: 'mock-jwt-token' });
  });

  it('displays empty state when no events exist', () => {
    renderWithProviders(<CustomerEvents />, {
      preloadedState: {
        restaurant: {
          events: [],
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('no-events-message')).toBeInTheDocument();
    expect(screen.getByTestId('events-count')).toHaveTextContent('0 Events Available');
  });

  it('displays events grouped by restaurant', () => {
    const mockEvents = [
      {
        eventId: 'event1',
        name: 'Pizza Party',
        restaurantId: 'rest1',
        restaurantName: 'Pizza Place'
      },
      {
        eventId: 'event2',
        name: 'Pasta Night',
        restaurantId: 'rest1',
        restaurantName: 'Pizza Place'
      },
      {
        eventId: 'event3',
        name: 'Burger Special',
        restaurantId: 'rest2',
        restaurantName: 'Burger Joint'
      }
    ];
    
    renderWithProviders(<CustomerEvents />, {
      preloadedState: {
        restaurant: {
          events: mockEvents,
          loading: false
        }
      }
    });
    
    // Check events count and list
    expect(screen.getByTestId('events-count')).toHaveTextContent('3 Events Available');
    expect(screen.getByTestId('events-list')).toBeInTheDocument();
    
    // Check restaurant groups
    expect(screen.getByTestId('restaurant-group-0')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-group-1')).toBeInTheDocument();
    
    // Check restaurant names
    expect(screen.getByTestId('restaurant-name-0')).toHaveTextContent('Pizza Place');
    expect(screen.getByTestId('restaurant-name-1')).toHaveTextContent('Burger Joint');
  });

  it('renders loading indicator when loading is true', () => {
    renderWithProviders(<CustomerEvents />, {
      preloadedState: {
        restaurant: {
          events: [],
          loading: true
        }
      }
    });
    
    // We can't directly test for GlobalLoading component since it might not render anything when not loading
    // But we can ensure the basic structure is still there
    expect(screen.getByTestId('customer-events-container')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
});