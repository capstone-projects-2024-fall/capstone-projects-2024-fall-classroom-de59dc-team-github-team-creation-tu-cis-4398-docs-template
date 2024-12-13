import React, { useState, useEffect }  from 'react';
import { Grid, Box, Paper, Typography, TextField, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
//import { user } from '../../data/mockProfileData';
import { Header } from '../../components';
import { tokens } from '../../theme'; 

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: 'flex',
  width: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,  
  color: theme.palette.neutral.main,
  fontWeight: 'bold',
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: theme.spacing(50),  // You can adjust the size as needed
  height: theme.spacing(50),
  marginBottom: theme.spacing(2),
  //borderRadius: '50%',  // To keep the circular shape
  border: `3px solid ${theme.palette.neutral.main}`,
}));
//console.log(user);
const UserProfile = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);  

  // Fetch user data based on email
  useEffect(() => {
    console.log("Fetching user data for email:", email);
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/user?email=${email}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
         // Fetch account age
        const ageResponse = await fetch(`http://localhost:5000/account-age?email=${email}`);
        if (!ageResponse.ok) {
          throw new Error(`HTTP error! status: ${ageResponse.status} ${ageResponse.statusText}`);
        }
        const ageData = await ageResponse.json();

        setUser({ ...data, accountAge: ageData });

        //setUser(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  if (loading) {
    return (
      <Box m="20px">
        <Typography variant="h5">Loading user data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box m="20px">
        <Typography variant="h5" color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box m="20px">
        <Typography variant="h5">User not found.</Typography>
      </Box>
    );
  }


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="User Profile" subtitle="Player's detailed information" />
        </Box>
      <ProfilePaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* <ProfileImage src={user?.avatar} alt={user.nickname} /> */}
            <ProfileImage src={user.picture_url} alt={user.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" sx={{ fontWeight:'bold' , fontSize: '30px' }} >{user.name.toUpperCase() + " "+ user.last_name.toUpperCase()}</Typography>
            <Typography variant="h5" sx={{ fontSize: '30px' }} >{user.nickname}</Typography>
            <Typography sx={{ fontSize: '30px' }} >{`Gold: ${user.gold}`}</Typography>
            <Typography sx={{ fontSize: '30px' }} >{`Age:  ${user.accountAge?.months} months`}</Typography>
            <Typography sx={{ fontSize: '30px' }} >{`Major: ${user.name}`}</Typography>
            <Typography  style={{ marginBottom: 50 }} sx={{ fontSize: '30px' }} >
              {`Motto: "${user.selectedMotto}"`}
            </Typography>
            {/* <Button variant="contained" color="primary">
              Edit Profile
            </Button> */}
          </Grid>
        </Grid>
      </ProfilePaper>
    </Box>
  );
};

export default UserProfile;
