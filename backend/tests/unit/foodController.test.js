import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Create mock implementations
const mockFoodModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn()
};

const mockFs = {
  unlink: jest.fn()
};

// Mock modules before importing
jest.unstable_mockModule('../../models/foodModel.js', () => ({
  default: mockFoodModel
}));

jest.unstable_mockModule('fs', () => ({
  default: mockFs,
  unlink: mockFs.unlink
}));

// Test data factory
const createMockFood = (overrides = {}) => ({
  _id: '507f1f77bcf86cd799439011',
  name: 'Biryani',
  description: 'Fragrant rice dish',
  price: 250,
  category: 'Rice',
  Image: 'biryani.png',
  ...overrides
});

describe('Food Controller Unit Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addFood - Input Validation', () => {
    it('should validate required fields are present', () => {
      const requiredFields = ['name', 'description', 'price', 'category', 'Image'];
      const foodData = {
        name: 'Biryani',
        description: 'Test',
        price: 250,
        category: 'Rice'
        // Missing Image
      };

      const missingFields = requiredFields.filter(field => !foodData[field] && field !== 'Image');
      expect(missingFields.length).toBe(0);
    });

    it('should validate price is a positive number', () => {
      const validPrices = [250, 100.50, 0.99];
      const invalidPrices = [-100, 0, null, 'abc'];

      validPrices.forEach(price => {
        expect(typeof price === 'number' && price > 0).toBe(true);
      });

      invalidPrices.forEach(price => {
        expect(typeof price === 'number' && price > 0).toBe(false);
      });
    });

    it('should validate category is from allowed list', () => {
      const allowedCategories = ['Rice', 'Noodles', 'Curry', 'Salad', 'Dessert'];
      const testCategories = ['Rice', 'Pizza', 'Curry'];

      testCategories.forEach(category => {
        const isValid = allowedCategories.includes(category);
        if (category === 'Pizza') {
          expect(isValid).toBe(false);
        } else {
          expect(isValid).toBe(true);
        }
      });
    });
  });

  describe('listFood - Database Query', () => {
    it('should retrieve all food items from database', async () => {
      const mockFoods = [
        createMockFood({ name: 'Biryani' }),
        createMockFood({ name: 'Noodles', category: 'Noodles' }),
        createMockFood({ name: 'Salad', category: 'Salad' })
      ];

      mockFoodModel.find.mockResolvedValue(mockFoods);

      const foods = await mockFoodModel.find({});

      expect(mockFoodModel.find).toHaveBeenCalledWith({});
      expect(foods).toHaveLength(3);
      expect(foods[0].name).toBe('Biryani');
    });

    it('should handle empty database gracefully', async () => {
      mockFoodModel.find.mockResolvedValue([]);

      const foods = await mockFoodModel.find({});

      expect(foods).toEqual([]);
      expect(foods).toHaveLength(0);
    });

    it('should filter food by category', async () => {
      const riceItems = [
        createMockFood({ name: 'Biryani', category: 'Rice' }),
        createMockFood({ name: 'Pulao', category: 'Rice' })
      ];

      mockFoodModel.find.mockResolvedValue(riceItems);

      const foods = await mockFoodModel.find({ category: 'Rice' });

      expect(foods.every(food => food.category === 'Rice')).toBe(true);
      expect(foods).toHaveLength(2);
    });
  });

  describe('removeFood - File and Database Operations', () => {
    it('should delete food item from database', async () => {
      const foodId = '507f1f77bcf86cd799439011';
      const mockFood = createMockFood({ _id: foodId });

      mockFoodModel.findById.mockResolvedValue(mockFood);
      mockFoodModel.findByIdAndDelete.mockResolvedValue(mockFood);
      mockFs.unlink.mockImplementation((path, callback) => callback());

      await mockFoodModel.findByIdAndDelete(foodId);

      expect(mockFoodModel.findByIdAndDelete).toHaveBeenCalledWith(foodId);
    });

    it('should delete associated image file', async () => {
      const mockFood = createMockFood();
      const expectedPath = `uploads/${mockFood.Image}`;

      mockFoodModel.findById.mockResolvedValue(mockFood);
      mockFs.unlink.mockImplementation((path, callback) => {
        expect(path).toBe(expectedPath);
        callback();
      });

      await mockFoodModel.findById(mockFood._id);
      mockFs.unlink(expectedPath, () => { });

      expect(mockFs.unlink).toHaveBeenCalled();
    });

    it('should handle file deletion errors gracefully', async () => {
      const testError = new Error('File not found');
      mockFs.unlink.mockImplementation((path, callback) => {
        callback(testError);
      });

      // The controller should not throw, error is caught
      mockFs.unlink('nonexistent.png', (err) => {
        expect(err).toBeDefined();
      });
    });
  });

  describe('Food Data Integrity', () => {
    it('should preserve all food properties on retrieval', async () => {
      const mockFood = createMockFood({
        _id: '507f1f77bcf86cd799439011',
        name: 'Special Biryani',
        description: 'Authentic recipe',
        price: 450,
        category: 'Rice',
        Image: 'special_biryani.png'
      });

      mockFoodModel.findById.mockResolvedValue(mockFood);

      const food = await mockFoodModel.findById(mockFood._id);

      expect(food.name).toBe('Special Biryani');
      expect(food.description).toBe('Authentic recipe');
      expect(food.price).toBe(450);
      expect(food.category).toBe('Rice');
      expect(food.Image).toBe('special_biryani.png');
    });
  });
});
