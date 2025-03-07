import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import MenuItemForm from './MenuItemForm';
import * as menuActions from '../../../redux/actions/menuActions';

// Mock redux actions
vi.mock('../../../redux/actions/menuActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/menuActions');
  return {
    ...actual,
    createMenuItem: vi.fn(() => ({ type: 'MOCK_CREATE_MENU_ITEM' })),
    updateMenuItem: vi.fn(() => ({ type: 'MOCK_UPDATE_MENU_ITEM' }))
  };
});

// Mock localStorage
vi.mock('window.localStorage', () => ({
  getItem: vi.fn(() => 'mock-jwt-token')
}), { virtual: true });

describe('MenuItemForm', () => {
  const handleCloseMock = vi.fn();
  
  // Test data
  const mockCategories = [
    { categoryId: 'cat1', name: 'Main Course' },
    { categoryId: 'cat2', name: 'Dessert' }
  ];
  
  const mockIngredients = [
    { ingredientsItemId: 'ing1', name: 'Tomato' },
    { ingredientsItemId: 'ing2', name: 'Cheese' }
  ];
  
  const mockRestaurantId = 'rest123';
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders create form when no menuItem is provided', () => {
    renderWithProviders(
      <MenuItemForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId },
            categories: mockCategories
          },
          ingredients: { ingredients: mockIngredients }
        }
      }
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Menu Item');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Create');
  });

  it('renders update form when menuItem is provided', () => {
    const mockMenuItem = {
      foodId: 'food123',
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10.99',
      image: 'image.jpg',
      vegetarian: false,
      seasonal: true,
      ingredients: [mockIngredients[0]]
    };
    
    renderWithProviders(
      <MenuItemForm handleClose={handleCloseMock} menuItem={mockMenuItem} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId },
            categories: mockCategories
          },
          ingredients: { ingredients: mockIngredients }
        }
      }
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Menu Item');
    expect(screen.getByTestId('menu-item-name-input')).toHaveValue('Pizza');
    expect(screen.getByTestId('menu-item-price-input')).toHaveValue(10.99);
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Update');
  });

  it('calls handleClose when cancel button is clicked', () => {
    renderWithProviders(
      <MenuItemForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId },
            categories: mockCategories
          },
          ingredients: { ingredients: mockIngredients }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls createMenuItem when form is submitted in create mode', () => {
    renderWithProviders(
      <MenuItemForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId },
            categories: mockCategories
          },
          ingredients: { ingredients: mockIngredients }
        }
      }
    );
    
    // Fill required fields
    fireEvent.change(screen.getByTestId('menu-item-name-input'), { 
      target: { value: 'New Item' } 
    });
    
    fireEvent.change(screen.getByTestId('menu-item-description-input'), { 
      target: { value: 'Description' } 
    });
    
    fireEvent.change(screen.getByTestId('menu-item-price-input'), { 
      target: { value: '15.99' } 
    });
    
    fireEvent.change(screen.getByTestId('menu-item-image-input'), { 
      target: { value: 'image.jpg' } 
    });
    
    // Submit form
    fireEvent.submit(screen.getByTestId('menu-item-form').querySelector('form'));
    
    // Check that create action was called
    expect(menuActions.createMenuItem).toHaveBeenCalledTimes(1);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls updateMenuItem when form is submitted in update mode', () => {
    const mockMenuItem = {
      foodId: 'food123',
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10.99',
      image: 'image.jpg',
      vegetarian: false,
      seasonal: true,
      ingredients: [mockIngredients[0]]
    };
    
    renderWithProviders(
      <MenuItemForm handleClose={handleCloseMock} menuItem={mockMenuItem} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId },
            categories: mockCategories
          },
          ingredients: { ingredients: mockIngredients }
        }
      }
    );
    
    // Update a field
    fireEvent.change(screen.getByTestId('menu-item-name-input'), { 
      target: { value: 'Updated Pizza' } 
    });
    
    // Submit form
    fireEvent.submit(screen.getByTestId('menu-item-form').querySelector('form'));
    
    // Check that update action was called
    expect(menuActions.updateMenuItem).toHaveBeenCalledTimes(1);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});