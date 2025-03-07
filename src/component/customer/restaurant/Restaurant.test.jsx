import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Restaurant from './Restaurant';
import * as restaurantActions from '../../../redux/actions/restaurantActions';
import * as menuActions from '../../../redux/actions/menuActions';

// Mock useParams and useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'rest123' }),
    useLocation: () => ({ search: '', pathname: '/restaurant/rest123' }),
    useNavigate: () => vi.fn()
  };
});

// Mock actions
vi.mock('../../../redux/actions/restaurantActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/restaurantActions');
  return {
    ...actual,
    getRestaurantById: vi.fn(() => ({ type: 'MOCK_GET_RESTAURANT' })),
    getRestaurantsCategory: vi.fn(() => ({ type: 'MOCK_GET_CATEGORIES' }))
  };
});

vi.mock('../../../redux/actions/menuActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/menuActions');
  return {
    ...actual,
    getMenuItemsByRestaurantId: vi.fn(() => ({ type: 'MOCK_GET_MENU_ITEMS' }))
  };
});

describe('Restaurant component', () => {
  const mockRestaurant = {
    restaurantId: 'rest123',
    name: 'Test Restaurant',
    description: 'A nice place to eat',
    address: '123 Main St',
    openingHours: '9:00 AM - 10:00 PM',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  };
  
  const mockCategories = [
    { categoryId: 'cat1', name: 'Main Course' },
    { categoryId: 'cat2', name: 'Dessert' }
  ];
  
  const mockMenuItems = [
    {
      foodId: 'food1',
      name: 'Pizza',
      description: 'Delicious pizza',
      price: 12.99,
      available: true
    },
    {
      foodId: 'food2',
      name: 'Burger',
      description: 'Juicy burger',
      price: 9.99,
      available: true
    }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches restaurant data and menu items on mount', () => {
    renderWithProviders(<Restaurant />, {
      preloadedState: {
        auth: { jwt: 'mock-jwt-token' }
      }
    });
    
    expect(restaurantActions.getRestaurantById).toHaveBeenCalledWith({
      jwt: 'mock-jwt-token',
      restaurantId: 'rest123'
    });
    
    expect(menuActions.getMenuItemsByRestaurantId).toHaveBeenCalled();
    expect(restaurantActions.getRestaurantsCategory).toHaveBeenCalled();
  });

  it('renders restaurant information correctly', () => {
    renderWithProviders(<Restaurant />, {
      preloadedState: {
        restaurant: {
          restaurant: mockRestaurant,
          categories: mockCategories,
          loading: false
        },
        menu: {
          menuItems: mockMenuItems,
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('restaurant-page')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-name')).toHaveTextContent(mockRestaurant.name);
    expect(screen.getByTestId('restaurant-description')).toHaveTextContent(mockRestaurant.description);
    expect(screen.getByTestId('restaurant-address')).toHaveTextContent(mockRestaurant.address);
    expect(screen.getByTestId('restaurant-hours')).toHaveTextContent(mockRestaurant.openingHours);
  });
  
  it('renders menu items correctly', () => {
    renderWithProviders(<Restaurant />, {
      preloadedState: {
        restaurant: {
          restaurant: mockRestaurant,
          categories: mockCategories,
          loading: false
        },
        menu: {
          menuItems: mockMenuItems,
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('menu-items-container')).toBeInTheDocument();
    
    // Check for each menu item
    mockMenuItems.forEach(item => {
      expect(screen.getByTestId(`menu-item-${item.foodId}`)).toBeInTheDocument();
    });
  });
  
  it('renders filter options correctly', () => {
    renderWithProviders(<Restaurant />, {
      preloadedState: {
        restaurant: {
          restaurant: mockRestaurant,
          categories: mockCategories,
          loading: false
        },
        menu: {
          menuItems: mockMenuItems,
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('filter-sidebar')).toBeInTheDocument();
    
    // Check food type filters
    expect(screen.getByTestId('food-type-all')).toBeInTheDocument();
    expect(screen.getByTestId('food-type-vegetarian')).toBeInTheDocument();
    expect(screen.getByTestId('food-type-non_vegetarian')).toBeInTheDocument();
    expect(screen.getByTestId('food-type-seasonal')).toBeInTheDocument();
    
    // Check category filters
    expect(screen.getByTestId('food-category-all')).toBeInTheDocument();
    mockCategories.forEach(category => {
      expect(screen.getByTestId(`food-category-${category.name}`)).toBeInTheDocument();
    });
  });
  
  it('displays message when no menu items found', () => {
    renderWithProviders(<Restaurant />, {
      preloadedState: {
        restaurant: {
          restaurant: mockRestaurant,
          categories: mockCategories,
          loading: false
        },
        menu: {
          menuItems: [],
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('no-menu-items')).toBeInTheDocument();
    expect(screen.getByTestId('no-menu-items')).toHaveTextContent('No menu items found');
  });
});