import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Ingredients from './Ingredients';

describe('Ingredients component', () => {
  // Sample data for tests
  const mockIngredients = [
    {
      ingredientsItemId: 'ing1',
      name: 'Tomato',
      ingredientCategoryName: 'Vegetables',
      inStock: true
    },
    {
      ingredientsItemId: 'ing2',
      name: 'Chicken',
      ingredientCategoryName: 'Meat',
      inStock: false
    }
  ];
  
  const mockCategories = [
    { ingredientCategoryId: 'cat1', name: 'Vegetables' },
    { ingredientCategoryId: 'cat2', name: 'Meat' }
  ];

  it('renders ingredients and categories tables', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: mockIngredients,
            category: mockCategories,
            loading: false
          }
        }
      }
    );
    
    // Check main container
    expect(screen.getByTestId('ingredients-container')).toBeInTheDocument();
    
    // Check ingredients table
    expect(screen.getByTestId('ingredients-table')).toBeInTheDocument();
    expect(screen.getByTestId(`ingredient-row-${mockIngredients[0].ingredientsItemId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`ingredient-name-${mockIngredients[0].ingredientsItemId}`)).toHaveTextContent('Tomato');
    
    // Check categories table
    expect(screen.getByTestId('categories-table')).toBeInTheDocument();
    expect(screen.getByTestId(`category-row-${mockCategories[0].ingredientCategoryId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`category-name-${mockCategories[0].ingredientCategoryId}`)).toHaveTextContent('Vegetables');
  });

  it('displays empty states when no data exists', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: [],
            category: [],
            loading: false
          }
        }
      }
    );
    
    expect(screen.getByTestId('no-ingredients-message')).toBeInTheDocument();
    expect(screen.getByTestId('no-categories-message')).toBeInTheDocument();
  });

  it('opens ingredient modal when add button is clicked', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: mockIngredients,
            category: mockCategories,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('add-ingredient-button'));
    
    expect(screen.getByTestId('ingredient-modal')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-form')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Ingredient');
  });

  it('opens ingredient modal with data when edit button is clicked', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: mockIngredients,
            category: mockCategories,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId(`edit-button-${mockIngredients[0].ingredientsItemId}`));
    
    expect(screen.getByTestId('ingredient-modal')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Ingredient');
  });

  it('opens category modal when add category button is clicked', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: mockIngredients,
            category: mockCategories,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('add-category-button'));
    
    expect(screen.getByTestId('category-modal')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-category-form')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Ingredient Category');
  });

  it('opens delete confirmation dialog when delete ingredient button is clicked', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: mockIngredients,
            category: mockCategories,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId(`delete-button-${mockIngredients[0].ingredientsItemId}`));
    
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent('Tomato');
  });

  it('opens delete confirmation dialog when delete category button is clicked', () => {
    renderWithProviders(
      <Ingredients />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            ingredients: mockIngredients,
            category: mockCategories,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId(`delete-category-button-${mockCategories[0].ingredientCategoryId}`));
    
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent('Vegetables');
  });
});