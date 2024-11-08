import { render, screen } from '@testing-library/react';
import App from './App';

test('returns "Hello, World!"', () => {
  const helloWorld = require('./helloWorld');
  expect(helloWorld()).toBe("Hello, World!");
});

test('renders learn react link', () => {
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});




