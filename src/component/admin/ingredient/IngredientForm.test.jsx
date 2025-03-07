import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import IngredientForm from './IngredientForm';

describe('IngredientForm', () => {
  const handleCloseMock = vi.fn();
  
  const mockCategories = [
    { ingredientCategoryId: 'cat1', name: 'Vegetables' },
    { ingredientCategoryId: 'cat2', name: 'Meat' }
  ];

  it('renders create form when no ingredient is provided', () => {
    renderWithProviders(
      <IngredientForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            category: mockCategories
          }
        }
      }
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Ingredient');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Create');
    expect(screen.getByTestId('ingredient-name-input')).toHaveValue('');
  });

  it('renders update form when ingredient is provided', () => {
    const mockIngredient = {
      ingredientsItemId: 'ing1',
      name: 'Tomato',
      category: { 
        ingredientCategoryId: 'cat1'
      }
    };
    
    renderWithProviders(
      <IngredientForm handleClose={handleCloseMock} ingredient={mockIngredient} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            category: mockCategories
          }
        }
      }
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Ingredient');
    expect(screen.getByTestId('ingredient-name-input')).toHaveValue('Tomato');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Update');
  });

  it('calls handleClose when cancel button is clicked', () => {
    renderWithProviders(
      <IngredientForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            category: mockCategories
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('allows updating form fields', () => {
    renderWithProviders(
      <IngredientForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          ingredients: {
            category: mockCategories
          }
        }
      }
    );
    
    // Change ingredient name
    fireEvent.change(screen.getByTestId('ingredient-name-input'), { 
      target: { value: 'New Ingredient' } 
    });
    
    expect(screen.getByTestId('ingredient-name-input')).toHaveValue('New Ingredient');
  });
});