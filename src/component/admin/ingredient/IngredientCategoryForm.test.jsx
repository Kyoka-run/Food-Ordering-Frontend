import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import IngredientCategoryForm from './IngredientCategoryForm';

describe('IngredientCategoryForm', () => {
  const handleCloseMock = vi.fn();

  it('renders create form when no category is provided', () => {
    renderWithProviders(
      <IngredientCategoryForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          }
        }
      }
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Ingredient Category');
    expect(screen.getByTestId('category-name-input')).toHaveValue('');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Create');
  });

  it('renders update form when category is provided', () => {
    const mockCategory = {
      ingredientCategoryId: 'cat1',
      name: 'Vegetables'
    };
    
    renderWithProviders(
      <IngredientCategoryForm handleClose={handleCloseMock} category={mockCategory} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          }
        }
      }
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Ingredient Category');
    expect(screen.getByTestId('category-name-input')).toHaveValue('Vegetables');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Update');
  });

  it('calls handleClose when cancel button is clicked', () => {
    renderWithProviders(
      <IngredientCategoryForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('allows updating form fields', () => {
    renderWithProviders(
      <IngredientCategoryForm handleClose={handleCloseMock} />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          }
        }
      }
    );
    
    // Change category name
    fireEvent.change(screen.getByTestId('category-name-input'), { 
      target: { value: 'New Category' } 
    });
    
    expect(screen.getByTestId('category-name-input')).toHaveValue('New Category');
  });
});