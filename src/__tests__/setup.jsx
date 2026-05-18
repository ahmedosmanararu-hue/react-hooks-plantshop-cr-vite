import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock fetch globally
global.fetch = vi.fn();

// Mock console.error to keep test output clean
global.console.error = vi.fn();

// Set up test data
global.basePlants = [
  { id: 1, name: 'Aloe', image: 'url', price: 45.99, soldOut: false },
  { id: 2, name: 'Snake Plant', image: 'url', price: 29.99, soldOut: false },
  { id: 3, name: 'ZZ Plant', image: 'url', price: 39.99, soldOut: true },
  { id: 4, name: 'Peperomia', image: 'url', price: 15.99, soldOut: false }
];

global.alternatePlants = [
  { id: 4, name: 'Pothos', image: 'url', price: 15.99, soldOut: false },
  { id: 5, name: 'Fiddle Leaf Fig', image: 'url', price: 55.99, soldOut: true }
];

// Helper function to mock fetch response
global.setFetchResponse = (data) => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
};

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});