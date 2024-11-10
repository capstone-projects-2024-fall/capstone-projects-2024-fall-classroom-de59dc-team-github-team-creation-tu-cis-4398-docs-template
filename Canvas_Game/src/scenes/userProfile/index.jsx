import React from 'react';
import { Grid, Box, Paper, Typography, TextField, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { user } from '../../data/mockProfileData';
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
console.log(user);
const UserProfile = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="User Profile" subtitle="Player's detailed information" />
        </Box>
      <ProfilePaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ProfileImage src={user?.avatar} alt={user.nickname} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" sx={{ fontWeight:'bold' , fontSize: '30px' }} >{user.nickname}</Typography>
            <Typography variant="h5" sx={{ fontSize: '30px' }} >{user.fullName}</Typography>
            <Typography sx={{ fontSize: '30px' }} >{`Score: ${user.score}`}</Typography>
            <Typography sx={{ fontSize: '30px' }} >{`Age: ${user.age}`}</Typography>
            <Typography sx={{ fontSize: '30px' }} >{`Major: ${user.major}`}</Typography>
            <Typography  style={{ marginBottom: 50 }} sx={{ fontSize: '30px' }} >
              {`Motto: "${user.motto}"`}
            </Typography>
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </ProfilePaper>
    </Box>
  );
};

export default UserProfile;
