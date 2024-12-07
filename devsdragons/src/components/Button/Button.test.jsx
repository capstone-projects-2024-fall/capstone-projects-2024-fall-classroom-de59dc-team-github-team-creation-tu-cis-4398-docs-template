import { render, screen, fireEvent } from '@testing-library/react'; 
import CustomButton from './Button'; 


// Group related tests using `describe`
describe('CustomButton Component', () => {
  
  // Test case 1: Verify that the button renders with the correct text
  it('renders the button with correct text', () => {
    // Render the CustomButton with some text
    render(<CustomButton onClick={() => {}}>Click Me</CustomButton>);
    
    // Get the button by its role and text
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Assert that the button is in the document
    expect(buttonElement).toBeInTheDocument();
  });

  // Test case 2: Check if the button applies the correct variant and color classes
  it('applies the correct variant and color', () => {
    // Render the CustomButton with the `outlined` variant and `secondary` color
    render(
      <CustomButton variant="outlined" color="secondary" onClick={() => {}}>
        Outlined Button
      </CustomButton>
    );

    // Get the button by its role and text
    const buttonElement = screen.getByRole('button', { name: /outlined button/i });

    // Check if the button has the correct MUI class for the variant and color
    expect(buttonElement).toHaveClass('MuiButton-outlinedSecondary');
  });

  // Test case 3: Ensure the onClick handler is called when the button is clicked
  it('calls onClick when the button is clicked', () => {
    // Create a mock function to track clicks
    const handleClick = vi.fn();

    // Render the CustomButton and pass the mock function as the onClick handler
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);

    // Get the button by its role and text
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Simulate a click event on the button
    fireEvent.click(buttonElement);

    // Assert that the mock function was called exactly once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
