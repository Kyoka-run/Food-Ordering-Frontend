import { describe, it, expect } from 'vitest';
import { cartTotal } from './TotalPay';

describe('TotalPay utility', () => {
  // Test for empty cart
  it('should return 0 for empty cart', () => {
    expect(cartTotal([])).toBe(0);
  });

  // Test for normal cart items calculation
  it('should calculate total correctly with multiple items', () => {
    const mockCartItems = [
      { totalPrice: 10.5 },
      { totalPrice: 23.99 },
      { totalPrice: 5.0 }
    ];
    expect(cartTotal(mockCartItems)).toBeCloseTo(39.49);
  });

  // Test for single item
  it('should return correct price for a single item', () => {
    const mockCartItems = [{ totalPrice: 15.75 }];
    expect(cartTotal(mockCartItems)).toBe(15.75);
  });
});