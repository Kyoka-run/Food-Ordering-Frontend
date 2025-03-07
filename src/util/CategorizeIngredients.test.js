import { describe, it, expect } from 'vitest';
import { categorizedIngredients } from './CategorizeIngredients';

describe('CategorizeIngredients utility', () => {
  // Test normal categorization 
  it('should categorize ingredients by category name', () => {
    const mockIngredients = [
      { 
        name: 'Tomato', 
        ingredientCategory: { name: 'Vegetables' } 
      },
      { 
        name: 'Lettuce', 
        ingredientCategory: { name: 'Vegetables' } 
      },
      { 
        name: 'Cheese', 
        ingredientCategory: { name: 'Dairy' } 
      }
    ];

    const result = categorizedIngredients(mockIngredients);
    
    expect(result).toHaveProperty('Vegetables');
    expect(result).toHaveProperty('Dairy');
    expect(result.Vegetables).toHaveLength(2);
    expect(result.Dairy).toHaveLength(1);
    expect(result.Vegetables[0].name).toBe('Tomato');
    expect(result.Vegetables[1].name).toBe('Lettuce');
    expect(result.Dairy[0].name).toBe('Cheese');
  });

  // Test for empty array
  it('should return empty object for empty ingredients array', () => {
    expect(categorizedIngredients([])).toEqual({});
  });
});