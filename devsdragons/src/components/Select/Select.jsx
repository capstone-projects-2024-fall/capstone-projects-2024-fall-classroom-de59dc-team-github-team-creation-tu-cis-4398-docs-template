// src/components/Select/CustomSelect.jsx
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

const CustomSelect = ({ 
  label, 
  value, 
  options, 
  onChange, 
  fullWidth = false, 
  variant = 'outlined', 
  sx 
}) => {
  return (
    <FormControl variant={variant} fullWidth={fullWidth} sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired, // Label for the Select input
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Current value of the Select
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Display text for the option
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Option value
    })
  ).isRequired, // Array of options
  onChange: PropTypes.func.isRequired, // Change handler for the Select
  fullWidth: PropTypes.bool, // Should the Select take full width
  variant: PropTypes.oneOf(['outlined', 'standard', 'filled']), // Select variant
  sx: PropTypes.object, // Custom styles
};

export default CustomSelect;
