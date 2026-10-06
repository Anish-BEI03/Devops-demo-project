import { describe, it, expect } from 'vitest';
import { formatMessageTime } from '../lib/utils';

describe('Chat Client Utils', () => {
  it('formats timestamp into HH:MM string properly', () => {
    const testDate = new Date('2026-10-06T14:30:00Z');
    const result = formatMessageTime(testDate);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
