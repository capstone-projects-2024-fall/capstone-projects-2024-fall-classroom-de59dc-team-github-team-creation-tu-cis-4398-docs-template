import DropdownMenu from '../../components/DropDownMenu/DropdownMenu';

const DropDownExample = () => {
  const handleOptionSelect = (option) => {
    alert(`Selected: ${option}`);
  };

  return (
    <div style={{ padding: '20px' }}>
    <h1>Dropdown Menu Example</h1>

    <DropdownMenu
      buttonLabel="Vertical Menu"
      options={['Option 1', 'Option 2', 'Option 3']}
      onOptionSelect={handleOptionSelect}
      direction="vertical" // Opens vertically (default)
    />

    <DropdownMenu
      buttonLabel="Horizontal Menu"
      options={['Option A', 'Option B', 'Option C']}
      onOptionSelect={handleOptionSelect}
      direction="horizontal" // Opens horizontally
    />
  </div>
  );
};

export default DropDownExample;