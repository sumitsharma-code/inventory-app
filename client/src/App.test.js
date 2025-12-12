import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/InventoryPro/i);
  expect(linkElement).toBeInTheDocument();
});
