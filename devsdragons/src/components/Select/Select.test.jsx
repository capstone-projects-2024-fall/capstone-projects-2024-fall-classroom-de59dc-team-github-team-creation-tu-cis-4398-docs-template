import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import CustomSelect from './Select'; // Adjust import path if necessary

// Reset all mock functions before each test to ensure no data is carried over
beforeEach(() => {
    vi.clearAllMocks(); 
  });
  
  // Clean up the DOM after each test to avoid side effects between tests
  afterEach(() => {
    cleanup(); 
  });
  
  // Group related tests using `describe`. This helps with organizing test cases logically.
  describe('CustomSelect Component', () => {

    // A single test case to verify that `onChange` is called when the user selects an option
    it('calls onChange when a new option is selected', () => {

      const mockCallback = vi.fn(); // Create a mock function to track `onChange` calls
  
      // Render the `CustomSelect` component with mock data and props
      const { getByRole } = render(

        <CustomSelect
          label="Test Select" // Label to identify the Select element
          value="1" // Initial value of the Select
          options={[ // List of options to display
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          onChange={mockCallback} // Attach the mock function to the `onChange` event
          fullWidth // Prop to make the Select span the full width of its container
          variant="outlined" // Use the outlined variant for styling
        />
      );
  
      // Find the Select element using the `getByRole` query.
      // The MUI Select component behaves like a `combobox` according to accessibility roles.
      const selectNode = screen.getByRole('combobox');
  
      // Simulate a `mouseDown` event to open the dropdown.
      // MUI Select needs a mouse interaction to open the list of options.
      fireEvent.mouseDown(selectNode);
  
      // Find the option with the text 'Option 3' using `getByText`.
      // This simulates the user clicking on the option to change the value.
      const option = screen.getByText('Option 3');
      fireEvent.click(option); // Simulate clicking the option
  
      // Verify if the `onChange` function was called exactly once.
      // This ensures that selecting an option triggers the callback as expected.
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });





  
// REFERENCE:
// https://debbie.codes/blog/building-and-testing-select-input/
