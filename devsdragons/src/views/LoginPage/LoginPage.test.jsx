// Import necessary modules
import React from 'react';
// Mock window.alert to avoid "Not implemented" errors during tests
global.alert = vi.fn();

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from './LoginPage';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Mock axios and useNavigate
vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock window.alert to avoid "Not implemented" errors during tests
global.alert = vi.fn();

describe('LoginPage', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('authorizes user login and navigates to /my-quests on success', async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    // Mock successful axios post response
    axios.post.mockResolvedValue({
      status: 200,
      data: { user_id: '12345' },
    });

    // Render the LoginPage component with MemoryRouter
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Find the input fields and button
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Begin Quest');

    // Simulate user input with unique credentials for the success test
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword1!' } });

    // Simulate form submission by clicking the login button
    fireEvent.click(loginButton);

    // Wait for axios post call and navigation
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/match_user', {
        email: 'testuser@example.com',
        password: 'TestPassword1!',
      });

      expect(localStorage.getItem('user_id')).toBe('12345');
      expect(mockNavigate).toHaveBeenCalledWith('/my-quests');
    });
  });

  it('displays error message when login fails', async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    // Mock failed axios post response to simulate server rejecting credentials
    axios.post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    // Render the LoginPage component with MemoryRouter
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Find the input fields and button
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Begin Quest');

    // Simulate user input with valid credentials (to pass validation but simulate failure on server)
    fireEvent.change(emailInput, { target: { value: 'wronguser@example.com' } }); // Valid email format
    fireEvent.change(passwordInput, { target: { value: 'WrongPassword1!' } }); // Valid password format

    // Simulate form submission by clicking the login button
    fireEvent.click(loginButton);

    // Wait for axios post call and error message to be displayed
    await waitFor(() => {
      // Expect axios to be called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/match_user', {
        email: 'wronguser@example.com',
        password: 'WrongPassword1!',
      });

      // Expect to see an error message displayed after failed login
      expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
    });
  });
});
