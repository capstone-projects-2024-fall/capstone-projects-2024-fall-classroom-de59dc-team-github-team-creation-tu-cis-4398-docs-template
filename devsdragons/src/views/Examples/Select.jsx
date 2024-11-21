// src/views/Examples/SelectExample.jsx
import React, { useState } from 'react';
import CustomSelect from '../../components/Select/Select';

const SelectExample = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    alert(`You selected: ${event.target.value}`);
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Select Example</h1>
      <CustomSelect
        label="Select an Option"
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default SelectExample;
