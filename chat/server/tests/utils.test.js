import { describe, it, expect } from '@jest/globals';
import { generateToken } from '../lib/utils.js';
import jwt from 'jsonwebtoken';

describe('Chat Server Utils', () => {
  it('generates a valid JWT token for a given userId', () => {
    process.env.JWT_SECRET = 'test_secret_123';
    const userId = 'user_abc_123';
    const token = generateToken(userId);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.userId).toBe(userId);
  });
});
