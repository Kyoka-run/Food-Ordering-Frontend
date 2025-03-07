import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import CategoryForm from './CategoryForm';
import * as restaurantActions from '../../../redux/actions/restaurantActions';

// Mock the restaurant actions
vi.mock('../../../redux/actions/restaurantActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/restaurantActions');
  return {
    ...actual,
    createCategory: vi.fn(() => ({ type: 'MOCK_CREATE_CATEGORY' })),
    updateCategory: vi.fn(() => ({ type: 'MOCK_UPDATE_CATEGORY' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('CategoryForm component', () => {
  // Common props
  const handleCloseMock = vi.fn();
  
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders create form when no category is provided', () => {
    renderWithProviders(
      <CategoryForm 
        handleClose={handleCloseMock} 
      />
    );
    
    // Verify the title shows Create
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Category');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Create');
    expect(screen.getByTestId('category-name-input')).toHaveValue('');
  });

  it('renders update form when category is provided', () => {
    const mockCategory = {
      categoryId: '123',
      name: 'Italian Cuisine'
    };
    
    renderWithProviders(
      <CategoryForm 
        handleClose={handleCloseMock} 
        category={mockCategory}
      />
    );
    
    // Verify the title shows Update and form is pre-filled
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Category');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Update');
    expect(screen.getByTestId('category-name-input')).toHaveValue('Italian Cuisine');
  });

  it('calls handleClose when cancel button is clicked', () => {
    renderWithProviders(
      <CategoryForm 
        handleClose={handleCloseMock} 
      />
    );
    
    // Click cancel button
    fireEvent.click(screen.getByTestId('cancel-button'));
    
    // Verify handleClose was called
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls createCategory when form is submitted in create mode', () => {
    const mockRestaurantId = 'restaurant-123';
    const categoryName = 'New Category';
    
    renderWithProviders(
      <CategoryForm 
        handleClose={handleCloseMock} 
      />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: mockRestaurantId }
          }
        }
      }
    );
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('category-name-input'), {
      target: { value: categoryName }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('category-form').querySelector('form'));
    
    // Verify createCategory was called with correct params
    expect(restaurantActions.createCategory).toHaveBeenCalledWith({
      reqData: {
        name: categoryName,
        restaurant: {
          restaurantId: mockRestaurantId
        }
      },
      jwt: 'mock-jwt-token'
    });
    
    // Verify handleClose was called
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls updateCategory when form is submitted in update mode', () => {
    const mockCategory = {
      categoryId: '123',
      name: 'Italian Cuisine'
    };
    const updatedName = 'Updated Italian Cuisine';
    
    renderWithProviders(
      <CategoryForm 
        handleClose={handleCloseMock} 
        category={mockCategory}
      />
    );
    
    // Change the name
    fireEvent.change(screen.getByTestId('category-name-input'), {
      target: { value: updatedName }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('category-form').querySelector('form'));
    
    // Verify updateCategory was called with correct params
    expect(restaurantActions.updateCategory).toHaveBeenCalledWith({
      reqData: {
        categoryId: '123',
        name: updatedName
      },
      jwt: 'mock-jwt-token'
    });
    
    // Verify handleClose was called
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});