import { describe, it, expect, beforeEach, jest } from '@jest/globals';

const mockUserModel = {
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
};

jest.unstable_mockModule('../../models/userModel.js', () => ({
  default: mockUserModel
}));

const { addToCart, removeFromCart, getCart } = await import('../../controllers/cartController.js');

describe('Cart Controller Unit Tests', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      body: {
        userId: 'user123',
        itemId: 'item456'
      }
    };
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('addToCart', () => {
    it('should return error if user is not found', async () => {
      mockUserModel.findById.mockResolvedValue(null);

      await addToCart(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found'
      });
    });

    it('should add new item to empty cart with quantity 1', async () => {
      mockUserModel.findById.mockResolvedValue({
        cartData: {}
      });
      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      await addToCart(mockReq, mockRes);

      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { cartData: { item456: 1 } },
        { new: true }
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Added to Cart'
      });
    });

    it('should increment item quantity if item already exists in cart', async () => {
      mockUserModel.findById.mockResolvedValue({
        cartData: { item456: 2 }
      });
      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      await addToCart(mockReq, mockRes);

      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { cartData: { item456: 3 } },
        { new: true }
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Added to Cart'
      });
    });
  });

  describe('removeFromCart', () => {
    it('should decrement item quantity and delete key when quantity reaches 0', async () => {
      mockUserModel.findById.mockResolvedValue({
        cartData: { item456: 1 }
      });
      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      await removeFromCart(mockReq, mockRes);

      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { cartData: {} },
        { new: true }
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Removed from Cart'
      });
    });
  });

  describe('getCart', () => {
    it('should return user cart data successfully', async () => {
      mockUserModel.findById.mockResolvedValue({
        cartData: { item456: 2 }
      });

      await getCart(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        cartData: { item456: 2 }
      });
    });
  });
});
