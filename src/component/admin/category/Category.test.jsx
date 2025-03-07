import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Category from './Category';
import * as restaurantActions from '../../../redux/actions/restaurantActions';

// Mock the restaurant actions
vi.mock('../../../redux/actions/restaurantActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/restaurantActions');
  return {
    ...actual,
    deleteCategory: vi.fn(() => ({ type: 'MOCK_DELETE_CATEGORY' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('Category component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with categories', () => {
    const mockCategories = [
      { categoryId: '1', name: 'Italian' },
      { categoryId: '2', name: 'Chinese' }
    ];
    
    renderWithProviders(<Category />, {
      preloadedState: {
        restaurant: {
          categories: mockCategories
        }
      }
    });
    
    // Verify component renders
    expect(screen.getByTestId('categories-container')).toBeInTheDocument();
    expect(screen.getByTestId('categories-card-header')).toBeInTheDocument();
    
    // Verify each category is displayed
    mockCategories.forEach(category => {
      expect(screen.getByTestId(`category-row-${category.categoryId}`)).toBeInTheDocument();
      expect(screen.getByTestId(`category-name-${category.categoryId}`)).toHaveTextContent(category.name);
    });
  });

  it('renders empty state when no categories exist', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        restaurant: {
          categories: []
        }
      }
    });
    
    // Verify empty state message
    expect(screen.getByTestId('no-categories-message')).toBeInTheDocument();
    expect(screen.getByTestId('no-categories-message')).toHaveTextContent('No categories found.');
  });

  it('opens modal when add button is clicked', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        restaurant: {
          categories: []
        }
      }
    });
    
    // Click add button
    fireEvent.click(screen.getByTestId('add-category-button'));
    
    // Verify modal is opened
    expect(screen.getByTestId('category-form')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Category');
  });
  
  it('opens modal with category data when edit button is clicked', () => {
    const mockCategories = [
      { categoryId: '1', name: 'Italian' }
    ];
    
    renderWithProviders(<Category />, {
      preloadedState: {
        restaurant: {
          categories: mockCategories
        }
      }
    });
    
    // Click edit button
    fireEvent.click(screen.getByTestId(`edit-button-${mockCategories[0].categoryId}`));
    
    // Verify modal is opened with category data
    expect(screen.getByTestId('category-form')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Category');
    expect(screen.getByTestId('category-name-input')).toHaveValue('Italian');
  });

  it('opens delete confirmation dialog when delete button is clicked', () => {
    const mockCategories = [
      { categoryId: '1', name: 'Italian' }
    ];
    
    renderWithProviders(<Category />, {
      preloadedState: {
        restaurant: {
          categories: mockCategories
        }
      }
    });
    
    // Click delete button
    fireEvent.click(screen.getByTestId(`delete-button-${mockCategories[0].categoryId}`));
    
    // Verify delete dialog is opened with category name
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    const dialog = screen.getByTestId('delete-confirmation-dialog');
    expect(within(dialog).getByTestId('item-name')).toHaveTextContent('Italian');
  });

  it('calls deleteCategory when deletion is confirmed', () => {
    const mockCategories = [
      { categoryId: '1', name: 'Italian' }
    ];
    
    renderWithProviders(<Category />, {
      preloadedState: {
        restaurant: {
          categories: mockCategories
        }
      }
    });
    
    // Click delete button to open dialog
    fireEvent.click(screen.getByTestId(`delete-button-${mockCategories[0].categoryId}`));
    
    // Confirm deletion
    fireEvent.click(screen.getByTestId('confirm-button'));
    
    // Verify deleteCategory was called with correct category ID
    expect(restaurantActions.deleteCategory).toHaveBeenCalledWith('1');
  });
});