import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders time endpoint header', () => {
  render(<App />);
  const linkElement = screen.getByText(/\/time endpoint/i);
  expect(linkElement).toBeInTheDocument();
});
