import { describe, it, expect } from 'vitest';
import React from 'react';
import FoodItem from '../components/FoodItem/FoodItem';

describe('Frontend FoodItem Component', () => {
  it('defines FoodItem component properly', () => {
    expect(FoodItem).toBeDefined();
    expect(typeof FoodItem).toBe('function');
  });
});
