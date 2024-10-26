import CustomButton from '../../components/Button/Button';

const Button = () => (
  <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <CustomButton 
        variant="contained" 
        color="primary" 
        onClick={() => alert('Primary Button')}
      >
        Primary
      </CustomButton>

      <CustomButton 
        variant="outlined" 
        color="secondary" 
        onClick={() => alert('Secondary Button')}
      >
        Secondary
      </CustomButton>

      <CustomButton 
        variant="text" 
        color="error" 
        onClick={() => alert('Error Button')}
      >
        Error
      </CustomButton>
    </div>

    {/* New Custom Button with sx Prop */}
    <CustomButton
      variant="contained"
      color="primary"
      onClick={() => alert('Styled Button')}
      sx={{
        backgroundColor: 'green',
        '&:hover': {
          backgroundColor: 'darkgreen',
        },
        padding: '16px 32px',
        fontSize: '18px',
        borderRadius: '12px',
      }}
    >
      Styled Button
    </CustomButton>
  </div>
);

export default Button;
