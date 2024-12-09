import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import { vi } from 'vitest'; // Vitest's mock function utility

describe('DropdownMenu Component', () => {
    // Sample options for the dropdown menu used across all tests
    const options = ['Option 1', 'Option 2', 'Option 3'];
  
    // Test 1: Check if the button renders with the correct label
    it('renders the button with the correct label', () => {
      // Render the DropdownMenu with a button label and dummy handler
      render(
        <DropdownMenu 
          buttonLabel="Open Menu" 
          options={options} 
          onOptionSelect={() => {}} 
        />
      );
  
      // Query the button by its role and text using `getByRole`
      const buttonElement = screen.getByRole('button', { name: /open menu/i });
  
      // Ensure the button is in the document
      expect(buttonElement).toBeInTheDocument();
    });
  
    // Test 2: Verify that clicking the button opens the menu with the provided options
    it('opens the menu when the button is clicked', () => {
      // Render the DropdownMenu with options and a dummy handler
      render(
        <DropdownMenu 
          buttonLabel="Open Menu" 
          options={options} 
          onOptionSelect={() => {}} 
        />
      );
  
      // Query the button and simulate a click event to open the menu
      const buttonElement = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(buttonElement);
  
      // Verify that all menu options are now visible in the DOM
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  
    // Test 3: Ensure the `onOptionSelect` handler is called with the correct option
    it('calls onOptionSelect with the correct option when clicked', () => {
      // Create a mock function to track clicks on options
      const handleOptionSelect = vi.fn();
  
      // Render the DropdownMenu with the mock handler
      render(
        <DropdownMenu 
          buttonLabel="Open Menu" 
          options={options} 
          onOptionSelect={handleOptionSelect} 
        />
      );
  
      // Open the menu by clicking the button
      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
  
      // Simulate clicking on "Option 2"
      fireEvent.click(screen.getByText('Option 2'));
  
      // Ensure the mock function was called with "Option 2" as the argument
      expect(handleOptionSelect).toHaveBeenCalledWith('Option 2');
    });
  });