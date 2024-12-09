// src/components/DropdownMenu/DropdownMenu.jsx
import { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import PropTypes from 'prop-types';

const DropdownMenu = ({ 
  buttonLabel, 
  options, 
  onOptionSelect, 
  direction = 'vertical' // Default direction is vertical
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    handleClose();
  };

  // Dynamic origin settings based on direction prop
  const getAnchorOrigin = () => {
    if (direction === 'horizontal') {
      return { vertical: 'top', horizontal: 'right' };
    }
    return { vertical: 'bottom', horizontal: 'left' };
  };

  const getTransformOrigin = () => {
    if (direction === 'horizontal') {
      return { vertical: 'top', horizontal: 'left' };
    }
    return { vertical: 'top', horizontal: 'left' };
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        {buttonLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={getAnchorOrigin()} // Use dynamic origin settings
        transformOrigin={getTransformOrigin()}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

// PropTypes to ensure proper usage
DropdownMenu.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']), // New direction prop
};

export default DropdownMenu;

