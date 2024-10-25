// src/components/Button/Button.jsx
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const CustomButton = ({ variant = 'contained', color = 'primary', onClick, children }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {children}
    </Button>
  );
};

// PropTypes for type-checking -- this will enforce strict type-checking during development to prevent bugs early
CustomButton.propTypes = {
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object, 
};

export default CustomButton;
