import { describe, it, expect, beforeEach, jest } from '@jest/globals';

const mockOrderModel = {
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
};

const mockUserModel = {
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
};

const mockEmailService = {
  sendOrderConfirmationEmail: jest.fn(),
  sendOrderStatusEmail: jest.fn()
};

jest.unstable_mockModule('../../models/orderModel.js', () => ({
  default: mockOrderModel
}));

jest.unstable_mockModule('../../models/userModel.js', () => ({
  default: mockUserModel
}));

jest.unstable_mockModule('../../utils/emailService.js', () => mockEmailService);

process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';

const { userOrders, listOrders, updateStatus } = await import('../../controllers/orderController.js');

describe('Order Controller Unit Tests', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      body: {}
    };
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('userOrders', () => {
    it('should return orders for a specific user', async () => {
      mockReq.body.userId = 'user123';
      const fakeOrders = [{ _id: 'order1', amount: 500 }];
      mockOrderModel.find.mockResolvedValue(fakeOrders);

      await userOrders(mockReq, mockRes);

      expect(mockOrderModel.find).toHaveBeenCalledWith({ userId: 'user123' });
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: fakeOrders
      });
    });
  });

  describe('listOrders', () => {
    it('should return all orders for admin panel', async () => {
      const fakeOrders = [{ _id: 'order1' }, { _id: 'order2' }];
      mockOrderModel.find.mockResolvedValue(fakeOrders);

      await listOrders(mockReq, mockRes);

      expect(mockOrderModel.find).toHaveBeenCalledWith({});
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: fakeOrders
      });
    });
  });

  describe('updateStatus', () => {
    it('should update order status and send notification email', async () => {
      mockReq.body = { orderId: 'order1', status: 'Delivered' };
      const updatedOrder = { _id: 'order1', userId: 'user123', status: 'Delivered' };
      const user = { email: 'customer@example.com', name: 'John Doe' };

      mockOrderModel.findByIdAndUpdate.mockResolvedValue(updatedOrder);
      mockUserModel.findById.mockResolvedValue(user);

      await updateStatus(mockReq, mockRes);

      expect(mockOrderModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'order1',
        { status: 'Delivered' },
        { new: true }
      );
      expect(mockEmailService.sendOrderStatusEmail).toHaveBeenCalledWith(
        'customer@example.com',
        'John Doe',
        'order1',
        'Delivered'
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Order status updated'
      });
    });
  });
});
