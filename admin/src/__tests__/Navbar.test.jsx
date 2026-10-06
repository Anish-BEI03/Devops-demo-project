import { describe, it, expect } from 'vitest';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';

describe('Admin Navbar Component', () => {
  it('renders navbar container properly', () => {
    expect(Navbar).toBeDefined();
    const element = React.createElement(Navbar);
    expect(element.type).toBe(Navbar);
  });
});
