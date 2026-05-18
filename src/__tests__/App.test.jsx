import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

describe('Plant Shop App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays plants on page load', async () => {
    const mockPlants = [
      { id: 1, name: 'Monstera', image: 'url', price: 45.99, soldOut: false }
    ];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera')).toBeInTheDocument();
    });
  });

  test('adds a new plant via form', async () => {
    const mockPlants = [];
    const newPlant = { id: 3, name: 'New Plant', image: 'url', price: 19.99, soldOut: false };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newPlant,
    });

    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('Plant name');
    const imageInput = screen.getByPlaceholderText('Image URL');
    const priceInput = screen.getByPlaceholderText('Price');
    const submitButton = screen.getByText('Add Plant');
    
    await userEvent.type(nameInput, 'New Plant');
    await userEvent.type(imageInput, 'https://example.com/plant.jpg');
    await userEvent.type(priceInput, '19.99');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('New Plant')).toBeInTheDocument();
    });
  });

  test('filters plants by search term', async () => {
    const mockPlants = [
      { id: 1, name: 'Monstera', image: 'url', price: 45.99, soldOut: false },
      { id: 2, name: 'Snake Plant', image: 'url', price: 29.99, soldOut: false }
    ];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera')).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('Search plants');
    await userEvent.type(searchInput, 'Monstera');
    
    expect(screen.getByText('Monstera')).toBeInTheDocument();
    expect(screen.queryByText('Snake Plant')).not.toBeInTheDocument();
  });

  test('toggles sold out status', async () => {
    const mockPlants = [
      { id: 1, name: 'Monstera', image: 'url', price: 45.99, soldOut: false }
    ];
    const updatedPlant = { id: 1, name: 'Monstera', image: 'url', price: 45.99, soldOut: true };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedPlant,
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('In Stock')).toBeInTheDocument();
    });
    
    const stockButton = screen.getByText('In Stock');
    await userEvent.click(stockButton);
    
    await waitFor(() => {
      expect(screen.getByText('Sold Out')).toBeInTheDocument();
    });
  });
});