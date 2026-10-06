import { describe, it, expect } from 'vitest';
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

describe('Admin Sidebar Component', () => {
  it('defines Sidebar component properly', () => {
    expect(Sidebar).toBeDefined();
    const element = React.createElement(Sidebar);
    expect(element.type).toBe(Sidebar);
  });
});
